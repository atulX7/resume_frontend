interface TailorResumeData {
  jobTitle: string;
  jobDescription: string;
  skills: string;
  resumeFile: File;
}

interface TailorResumeResponse {
  success: boolean;
  data?: {
    review_suggestions: string;
  };
  error?: string;
}

export class ResumeTailorService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  private static USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  static async tailorResume(data: TailorResumeData): Promise<TailorResumeResponse> {
    try {
      if (this.USE_MOCK) {
        return {
          success: true,
          data: {
            review_suggestions: "Added relevant keywords from job description",
          }
        };
      }

      const formData = new FormData();
      formData.append('jobTitle', data.jobTitle);
      formData.append('jobDescription', data.jobDescription);
      formData.append('skills', data.skills);
      formData.append('resumeFile', data.resumeFile);

      const response = await fetch(`${this.BASE_URL}/tailor-resume`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('API Error:', result);
        return {
          success: false,
          error: result.message || `Failed to tailor resume (Status: ${response.status})`
        };
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Detailed error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while tailoring the resume'
      };
    }
  }
} 