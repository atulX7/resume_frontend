import { getSession } from "next-auth/react";
import { handle403Error } from '@/utils/error-handler';

interface ResumeAnalysisResult {
  scores: {
    [key: string]: number;
  };
  overall_summary: string;
  detailed_evaluation: Array<{
    criterion: string;
    description: string;
    score: number;
    status: 'green' | 'yellow' | 'red';
    assessment: string;
  }>;
}

interface ResumeScoreResponse {
  success: boolean;
  data?: ResumeAnalysisResult;
  error?: string;
}

export class ResumeService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getResumeScore(resumeFile: File): Promise<ResumeScoreResponse> {
    const session = await getSession();
    if (!session?.accessToken) {
      throw new Error('No active session');
    }

    try {
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const response = await fetch(`${this.BASE_URL}/score/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (response.status === 403) {
          handle403Error();
          return { success: false, error: 'Usage limit reached' };
        }
        return { success: false, error: result.message || 'Failed to analyze resume' };
      }

      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }
}