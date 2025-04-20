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

interface MatchedPoint {
  text: string;
  justification: string;
  highlight_color: string;
}

interface ModifiedPoint {
  current_text: string;
  suggested_text: string;
  highlight_color: string;
}

interface MissingPoint {
  expected_topic: string;
  suggestion: string;
  highlight_color: string;
}

interface ExperienceImprovement {
  position: string;
  company: string;
  matched_points: MatchedPoint[];
  modified_points: ModifiedPoint[];
  missing_points: MissingPoint[];
}

interface SkillMapping {
  skill: string;
  currently_in_resume: boolean;
  recommended_section: string;
  action: string;
}

interface SkillsAnalysis {
  used_well: string[];
  underutilized: string[];
  missing_keywords: string[];
  suggested_action: string;
}

interface JdAlignmentSummary {
  total_jd_points: number;
  matched: number;
  partially_matched: number;
  missing: number;
  match_score_percent: number;
}

interface TailorResumeResponse {
  success: boolean;
  data?: {
    review_suggestions: {
      summary: ResumeSection;
      experience: ExperienceImprovement[];
      user_skills_mapping: SkillMapping[];
      skills: SkillsAnalysis;
      jd_alignment_summary: JdAlignmentSummary;
      section_scores: {
        summary: number;
        experience: number;
        skills: number;
        projects: number;
        education: number;
      };
      new_sections: Array<{
        title: string;
        content: string;
        highlight_color: string;
      }>;
      recommendations: string[];
      final_notes: string[];
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

      if (response.status === 403) {
        handle403Error();
        return { success: false, error: 'Usage limit reached' };
      }

      if (!response.ok) {
        console.error('API Error:', result);
        return {
          success: false,
          error: result.message || `Failed to tailor resume (Status: ${response.status})`
        };
      }

      return { 
        success: true, 
        data: result
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