import { getSession, signOut } from "next-auth/react";
import { handle403Error } from '@/utils/error-handler';

interface ResumeAnalysisResult {
  overall_score: number;
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

const handleUnauthorizedError = async () => {
  await signOut({ redirect: false });
  window.location.href = "/auth/login?error=Unauthorized&message=Your session has expired. Please log in again.";
};

const checkAuthorization = async () => {
  const session = await getSession();
  if (!session?.accessToken) {
    await handleUnauthorizedError();
    throw new Error("Unauthorized");
  }
  return session.accessToken;
};

export class ResumeService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getResumeScore(resumeFile: File): Promise<ResumeScoreResponse> {
    try {
      const accessToken = await checkAuthorization();
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const response = await fetch(`${this.BASE_URL}/score/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 401) {
        await handleUnauthorizedError();
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        if (response.status === 403) {
          handle403Error();
          return { success: false, error: 'Usage limit reached' };
        }
        const result = await response.json();
        return { success: false, error: result.message || 'Failed to analyze resume' };
      }

      const result = await response.json();
      
      // Ensure overall_score is a number
      if (typeof result.overall_score === 'object') {
        // If it's still coming as an object, take the first value or default to 0
        result.overall_score = Object.values(result.overall_score)[0] || 0;
      }

      return { success: true, data: result };
    } catch (error) {
      if (error instanceof Error && error.message === "Unauthorized") {
        await handleUnauthorizedError();
      }
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }
}