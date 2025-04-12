import { getSession } from "next-auth/react";
import { handle403Error } from '@/utils/error-handler';

interface TailorResumeData {
  jobTitle: string;
  jobDescription: string;
  skills: string;
  resumeFile: File;
}

interface ResumeSection {
  current_text: string;
  suggested_text: string;
  highlight_color: string;
}

interface ExperienceImprovement {
  position: string;
  company: string;
  improvements: ResumeSection[];
}

interface NewSection {
  title: string;
  content: string;
  highlight_color: string;
}

interface TailorResumeResponse {
  success: boolean;
  data?: {
    sections: {
      summary?: ResumeSection;
      experience?: ExperienceImprovement[];
      new_sections?: NewSection[];
    };
  };
  error?: string;
}

export class ResumeTailorService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  static async tailorResume(data: TailorResumeData): Promise<TailorResumeResponse> {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        throw new Error('No active session');
      }

      const formData = new FormData();
      formData.append('job_title', data.jobTitle);
      formData.append('job_description', data.jobDescription);
      formData.append('skills', data.skills);
      formData.append('user_resume', data.resumeFile);

      const response = await fetch(`${this.BASE_URL}/ai-resume/tailor`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
        },
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

      if (response.status === 403) {
        handle403Error();
        return { success: false, error: 'Usage limit reached' };
      }

      return { 
        success: true, 
        data: {
          sections: result
        } 
      };
    } catch (error) {
      console.error('Detailed error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while tailoring the resume'
      };
    }
  }
}