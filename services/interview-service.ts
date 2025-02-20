import { ApiError } from "next/dist/server/api-utils";

interface AnalysisResponse {
  success: boolean;
  data?: unknown; 
}

interface CreateInterviewData {
  user_id: string;
  job_title: string;
  job_description: string;
  resume_file: File;
}

interface CreateInterviewResponse {
  success: boolean;
  data?: {
    id: string;
    questions: Array<{
      question_id: string;
      question: string;
    }>;
  };
  error?: string;
}

export class InterviewService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getAnalysis(interviewId: string): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/mock-interview/analysis/${interviewId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      if (error instanceof ApiError) {
        return { success: false, data: error.message };
      }
      return { success: false, data: "An error occurred" };
    }
  }

  static async createInterview(data: CreateInterviewData): Promise<CreateInterviewResponse> {
    try {
      // Log the incoming data (remove in production)
      console.log('Creating interview with data:', {
        user_id: data.user_id,
        job_title: data.job_title,
        job_description: data.job_description,
        has_resume: !!data.resume_file
      });

      const formData = new FormData();
      formData.append('user_id', data.user_id || 'default-user');
      formData.append('job_title', data.job_title);
      formData.append('job_description', data.job_description);
      
      if (data.resume_file) {
        formData.append('resume_file', data.resume_file);
      }

      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        console.log('Using mock data');
        return {
          success: true,
          data: {
            id: "2a2c8407-a028-4ded-91cf-b7af4e8e4145",
            questions: [
              {
                question_id: "b7465672-2a2c8407-1",
                question: "Hello and welcome! It's great to have you here today. I'm Alex, and I'm looking forward to our conversation. To start things off, could you please introduce yourself and share a bit about your career journey?"
              },
              {
                question_id: "b7465672-2a2c8407-2",
                question: "Can you elaborate on a project where you had to migrate infrastructure to Google Cloud and how you ensured the transition was seamless?"
              },
              {
                question_id: "b7465672-2a2c8407-3",
                question: "Describe a scenario where you worked collaboratively with a cross-functional team to obtain data-driven insights that drove business growth."
              }
            ]
          }
        };
      }

      console.log('Making API request to:', `${this.BASE_URL}/mock-interview/start`);
      
      const response = await fetch(`${this.BASE_URL}/mock-interview/start`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (!response.ok) {
        console.error('API Error:', result);
        return { 
          success: false, 
          error: result.message || `Failed to create interview (Status: ${response.status})` 
        };
      }

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
}