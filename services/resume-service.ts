import { ErrorService } from "@/utils/error-service";

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

export class ResumeService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async getResumeScore(resumeFile: File): Promise<ResumeScoreResponse> {
    try {
      const accessToken = await ErrorService.checkAuthorization();
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const response = await fetch(`${this.BASE_URL}/score/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const error = new Error(`Failed to analyze resume (Status: ${response.status})`);
        return await ErrorService.handleError(error) as ResumeScoreResponse;
      }

      const result = await response.json();
      
      // Ensure overall_score is a number
      if (typeof result.overall_score === 'object') {
        // If it's still coming as an object, take the first value or default to 0
        result.overall_score = Object.values(result.overall_score)[0] || 0;
      }

      return { success: true, data: result };
    } catch (error) {
      return await ErrorService.handleError(error) as ResumeScoreResponse;
    }
  }
}