import { ApiError } from "next/dist/server/api-utils";
import { getSession, signOut } from "next-auth/react";
import { handle403Error } from "@/utils/error-handler";
import { handle401Error } from "@/utils/error-handler";
import { toast } from "sonner";

export interface AnalysisResponse {
  success: boolean;
  data?: {
    session_id: string;
    job_title: string;
    created_at: string;
    status: string;
    overall_score: number;
    key_strengths: string[];
    areas_for_growth: string[];
    skill_assessment: {
      technical: number;
      problem_solving: number;
      communication: number;
      leadership: number;
      adaptability: number;
      behavioral_fit: number;
      confidence: number;
    };
    evaluation_results: Array<{
      question: string;
      score: number;
      feedback: string;
      audio_presigned_url: string;
      follow_up_question: string;
    }>;
    questions: Array<{
      question_id: string;
      question: string;
    }>;
  };
  error?: string;
}

interface CreateInterviewData {
  user_id: string;
  job_title: string;
  job_description: string;
  resume_temp_key?: string;
}

interface CreateInterviewResponse {
  success: boolean;
  data?: {
    id: string;
    session_id: string;
    questions: Array<{
      question_id: string;
      question: string;
    }>;
  };
  error?: string;
}

interface ProcessInterviewResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

interface UserInterviewsResponse {
  success: boolean;
  data?: Array<{
    session_id: string;
    job_title: string;
    created_at: string;
    status: 'completed' | 'in_progress' | 'pending';
    score?: number;
  }>;
  error?: string;
}

interface ProcessResumeResponse {
  success: boolean;
  data?: {
    temp_key: string;
  };
  error?: string;
}

const handleUnauthorizedError = async () => {
  toast.error("Session expired. Please log in again.");
  await signOut({ redirect: false });
  window.location.href = "/auth/login";
};

const checkAuthorization = async () => {
  const session = await getSession();
  if (!session?.accessToken) {
    await handleUnauthorizedError();
    throw new Error("Unauthorized");
  }
  return session.accessToken;
};

export class InterviewService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getAnalysis(interviewId: string): Promise<AnalysisResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/mock-interview/sessions/${interviewId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch analysis (Status: ${response.status})`);
      }
      const data = await response.json();
      if (response.status === 401) {
        handle401Error();
        return { success: false, error: 'Session expired' };
      }
      if (response.status === 403) {
        handle403Error();
        return { success: false, error: 'Usage limit reached' };
      }
      return { success: true, data };


    } catch (error) {
      console.error('Error fetching analysis:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred while fetching the analysis'
      };
    }
  }

  static async createInterview(data: CreateInterviewData): Promise<CreateInterviewResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      if (!data.job_title?.trim()) {
        return { success: false, error: 'Job title is required' };
      }
      if (!data.job_description?.trim()) {
        return { success: false, error: 'Job description is required' };
      }
      if (!data.user_id?.trim()) {
        return { success: false, error: 'User ID is required' };
      }

      const formData = new FormData();
      formData.append('job_title', data.job_title);
      formData.append('job_description', data.job_description);
      
      if (data.resume_temp_key) {
        formData.append('resume_temp_key', data.resume_temp_key);
      }

      const response = await fetch(`${this.BASE_URL}/mock-interview/start`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        const errorMessage = result.message || result.error || `Failed to create interview (Status: ${response.status})`;
        console.error('API Error:', errorMessage);
        return { success: false, error: errorMessage };
      }

      if (!result.session_id || !result.questions) {
        return { success: false, error: 'Invalid response format from server' };
      }

      if (response.status === 401) {
        handle401Error();
        return { success: false, error: 'Session expired' };
      }
      if (response.status === 403) {
        handle403Error();
        return { success: false, error: 'Usage limit reached' };
      }

      localStorage.setItem('current-interview-questions', JSON.stringify(result.questions));
      return { success: true, data: result };
    } catch (error) {
      console.error('Detailed error:', error);
      if (error instanceof ApiError) {
        return { success: false, error: error.message };
      }
      return { 
        success: false, 
        error: `An error occurred while creating the interview: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  static async processInterview(
    interviewId: string, 
  ): Promise<ProcessInterviewResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch(`${this.BASE_URL}/mock-interview/${interviewId}/process`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Log detailed error information
        console.error('Process Interview Error:', {
          status: response.status,
          statusText: response.statusText,
          data
        });

        if (response.status === 401) {
          handle401Error();
          return { success: false, error: 'Session expired' };
        }
        if (response.status === 403) {
          handle403Error();
          return { success: false, error: 'Usage limit reached' };
        }
        if (response.status === 500) {
          return { 
            success: false, 
            error: data.message || data.error || 'Server error occurred while processing the interview'
          };
        }

        throw new Error(data.message || data.error || `Failed to process interview (Status: ${response.status})`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error processing interview:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred while processing the interview'
      };
    }
  }

  static async getUserInterviews(sessionId?: string): Promise<UserInterviewsResponse> {
    try {
      const accessToken = await checkAuthorization();
      const url = sessionId 
        ? `${this.BASE_URL}/mock-interview/sessions/${sessionId}`
        : `${this.BASE_URL}/mock-interview/sessions`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        await handleUnauthorizedError();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorMessage = `Failed to fetch interviews (Status: ${response.status})`;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (response.status === 403) {
        handle403Error();
        return { success: false, error: 'Usage limit reached' };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        await handleUnauthorizedError();
      } else {
        toast.error('Failed to fetch interviews. Please try again later.');
      }
      console.error('Error fetching user interviews:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while fetching interviews'
      };
    }
  }

  static async uploadAnswer(
    interviewId: string,
    questionId: string,
    audioBlob: Blob
  ): Promise<ProcessInterviewResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }
  
    try {
      const formData = new FormData();
      const audioFile = new File([audioBlob], `q${questionId}.mp3`, { type: "audio/mpeg" });
      
      formData.append('question_id', questionId);
      formData.append('answer_audio', audioFile);
  
      fetch(
        `${this.BASE_URL}/mock-interview/${interviewId}/upload-answer`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      ).catch(error => {
        console.error('Error uploading answer in background:', error);
        toast.error('Failed to upload answer in background');
      });

      return { success: true, data: { status: 'uploading' } };
    } catch (error) {
      console.error('Error preparing answer upload:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while preparing the answer upload'
      };
    }
  }

  static async processResume(resumeFile: File): Promise<ProcessResumeResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      // Dummy API endpoint
      const response = await fetch(`${this.BASE_URL}/resumes/upload-temp-resume`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to process resume (Status: ${response.status})`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error processing resume:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while processing the resume'
      };
    }
  }
}