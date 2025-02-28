import { ApiError } from "next/dist/server/api-utils";
import { getSession } from "next-auth/react";

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
  resume_file?: File | null;
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
      // Validate required fields
      if (!data.job_title?.trim()) {
        return { success: false, error: 'Job title is required' };
      }
      if (!data.job_description?.trim()) {
        return { success: false, error: 'Job description is required' };
      }
      if (!data.user_id?.trim()) {
        return { success: false, error: 'User ID is required' };
      }

      // Log the incoming data (remove in production)
      console.log('Creating interview with data:', {
        user_id: data.user_id,
        job_title: data.job_title,
        job_description: data.job_description,
        has_resume: !!data.resume_file
      });

      const formData = new FormData();
      formData.append('job_title', data.job_title);
      formData.append('job_description', data.job_description);
      
      if (data.resume_file) {
        formData.append('resume_file', data.resume_file);
      }

      console.log('Making API request to:', `${this.BASE_URL}/mock-interview/start`);
      
      const response = await fetch(`${this.BASE_URL}/mock-interview/start`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (!response.ok) {
        const errorMessage = result.message || result.error || `Failed to create interview (Status: ${response.status})`;
        console.error('API Error:', errorMessage);
        return { success: false, error: errorMessage };
      }

      if (!result.session_id || !result.questions) {
        return { success: false, error: 'Invalid response format from server' };
      }

      // Save questions to localStorage
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
    recordings: Blob[], 
    questionIds: string[]
  ): Promise<ProcessInterviewResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      const formData = new FormData();
      
      const questionAudioMap: { [key: string]: string } = {};
      const audioBlobs: Blob[] = [];

      recordings.forEach((recording, index) => {
        const questionId = questionIds[index];
        const audioFileName = `answer_${questionId}.mp3`;
        questionAudioMap[questionId] = audioFileName;
        audioBlobs.push(recording);
      });

      // Log the question audio map
      console.log('questionAudioMap', questionAudioMap);

      // Add question_audio_map as JSON string
      formData.append('question_audio_map', JSON.stringify(questionAudioMap));

      // Combine all audio blobs into one Blob
      const combinedBlob = new Blob(audioBlobs, { type: 'audio/mpeg' });
      console.log('combinedBlob', combinedBlob);

      // Append the combined audio blob to the form data
      formData.append('audio_files', combinedBlob, 'combined_recordings.mp3');

      console.log('Sending data to server:', {
        question_audio_map: questionAudioMap,
        recordings: recordings.map((_, index) => `answer_${questionIds[index]}.mp3`), // Log file names
      });

      const response = await fetch(`${this.BASE_URL}/mock-interview/${interviewId}/process`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { 
          success: false, 
          error: data.message || `Failed to process interview (Status: ${response.status})`
        };
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
}