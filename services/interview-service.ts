import { ErrorService } from "@/utils/error-service"; 

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



export class InterviewService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getAnalysis(interviewId: string): Promise<AnalysisResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();

      const response = await fetch(`${this.BASE_URL}/mock-interview/sessions/${interviewId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = new Error(`Failed to fetch analysis (Status: ${response.status})`);
        return await ErrorService.handleError(error) as AnalysisResponse;
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return await ErrorService.handleError(error) as AnalysisResponse;
    }
  }

  static async createInterview(data: CreateInterviewData): Promise<CreateInterviewResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();

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
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        const error = new Error(result.message || result.error || `Failed to create interview (Status: ${response.status})`);
        return await ErrorService.handleError(error) as CreateInterviewResponse;
      }

      if (!result.session_id || !result.questions) {
        return { success: false, error: 'Invalid response format from server' };
      }

      localStorage.setItem('current-interview-questions', JSON.stringify(result.questions));
      return { success: true, data: result };
    } catch (error) {
      return await ErrorService.handleError(error) as CreateInterviewResponse;
    }
  }

  static async processInterview(interviewId: string): Promise<ProcessInterviewResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();

      const response = await fetch(`${this.BASE_URL}/mock-interview/${interviewId}/process`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || data.error || `Failed to process interview (Status: ${response.status})`);
        return await ErrorService.handleError(error) as ProcessInterviewResponse;
      }

      return { success: true, data };
    } catch (error) {
      return await ErrorService.handleError(error) as ProcessInterviewResponse;
    }
  }

  static async getUserInterviews(sessionId?: string): Promise<UserInterviewsResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();
      const url = sessionId 
        ? `${this.BASE_URL}/mock-interview/sessions/${sessionId}`
        : `${this.BASE_URL}/mock-interview/sessions`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = new Error(`Failed to fetch interviews (Status: ${response.status})`);
        return await ErrorService.handleError(error) as UserInterviewsResponse;
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return await ErrorService.handleError(error) as UserInterviewsResponse;
    }
  }

  static async uploadAnswer(
    interviewId: string,
    questionId: string,
    audioBlob: Blob
  ): Promise<ProcessInterviewResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();

      const formData = new FormData();
      const audioFile = new File([audioBlob], `q${questionId}.mp3`, { type: "audio/mpeg" });
      
      formData.append('question_id', questionId);
      formData.append('answer_audio', audioFile);

      const response = await fetch(
        `${this.BASE_URL}/mock-interview/${interviewId}/upload-answer`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const error = new Error(`Failed to upload answer (Status: ${response.status})`);
        return await ErrorService.handleError(error) as ProcessInterviewResponse;
      }

      return { success: true, data: { status: 'uploading' } };
    } catch (error) {
      return await ErrorService.handleError(error) as ProcessInterviewResponse;
    }
  }

  static async processResume(resumeFile: File): Promise<ProcessResumeResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();

      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const response = await fetch(`${this.BASE_URL}/resumes/upload-temp-resume`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = new Error(`Failed to process resume (Status: ${response.status})`);
        return await ErrorService.handleError(error) as ProcessResumeResponse;
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return await ErrorService.handleError(error) as ProcessResumeResponse;
    }
  }
}