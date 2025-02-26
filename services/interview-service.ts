import { ApiError } from "next/dist/server/api-utils";

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
    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return {
          success: true,
          data: {
            session_id: "2a2c8407-a028-4ded-91cf-b7af4e8e4145",
            job_title: "Sr. AI Lead (Gen AI)",
            created_at: "2025-02-17 14:56:51",
            status: "completed",
            overall_score: 3,
            key_strengths: [
              "The candidate attempted to discuss the importance of scenario-based questions..."
            ],
            areas_for_growth: [
              "The candidate did not provide specific answers to any of the questions...",
              // ... other areas
            ],
            skill_assessment: {
              technical: 1,
              problem_solving: 1,
              communication: 2,
              leadership: 1,
              adaptability: 1,
              behavioral_fit: 1,
              confidence: 2
            },
            evaluation_results: [
              {
                question: "Hello and welcome!...",
                score: 3,
                feedback: "The candidate's response did not directly answer...",
                audio_presigned_url: "https://...",
                follow_up_question: "Can you provide..."
              },
              // ... other evaluation results
            ],
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

      const response = await fetch(`${this.BASE_URL}/mock-interview/sessions/${interviewId}`);
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
      formData.append('user_id', data.user_id);
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
            session_id: "2a2c8407-a028-4ded-91cf-b7af4e8e4145",
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
    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        return {
          success: true,
          data: {
            message: "Interview processed successfully"
          }
        };
      }

      const formData = new FormData();
      
      // Create question_audio_map object
      const questionAudioMap: { [key: string]: string } = {};
      recordings.forEach((_, index) => {
        const questionId = questionIds[index];
        questionAudioMap[questionId] = `answer_${questionId}.mp3`;
      });
      console.log('questionAudioMap', questionAudioMap);

      // Add question_audio_map as JSON string
      formData.append('question_audio_map', JSON.stringify(questionAudioMap));

      
      const combinedBlob = new Blob(recordings, { type: 'audio/mpeg' });
      console.log('combinedBlob', combinedBlob);
      formData.append('audio_files', combinedBlob, 'recordings.mp3');


      console.log('Sending data to server:', {
        question_audio_map: questionAudioMap,
        recordings: recordings.map((_, index) => `answer_${questionIds[index]}.mp3`), // Log file names
      });

      const response = await fetch(`${this.BASE_URL}/mock-interview/${interviewId}/process`, {
        method: 'POST',
        body: formData,
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