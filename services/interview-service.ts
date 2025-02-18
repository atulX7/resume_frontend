import { ApiError } from "next/dist/server/api-utils";

interface AnalysisResponse {
  success: boolean;
  data?: unknown; 
}

export class InterviewService {
  static async getAnalysis(interviewId: string): Promise<AnalysisResponse> {
    try {

      const response = await fetch(`/api/analysis/${interviewId}`);
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      if (error instanceof ApiError) {
        return { success: false, data: error.message };
      }
      return { success: false, data: "An error occurred" };
    }
  }
}