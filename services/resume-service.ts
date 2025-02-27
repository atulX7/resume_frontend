interface ResumeScoreResponse {
  success: boolean;
  scores?: {
    [key: string]: number;
  };
  error?: string;
}

const MOCK_SCORES = {
  scores: {
    layout: 75,
    ats_readability: 80,
    impact: 70,
    keyword_optimization: 65,
    quantifiable_achievements: 85,
    action_verbs: 80,
    readability: 70,
    personal_branding: 60,
    customization: 55,
    grammar_spelling: 95,
    contact_info: 80,
    section_completeness: 90,
    visual_appeal: 75,
    cultural_fit: 70,
    social_proof: 85,
    career_progression: 75,
    emotional_appeal: 65,
    conciseness: 80,
    bullet_point_clarity: 75,
    industry_keywords: 75,
    call_to_action: 60
  }
};

export class ResumeService {
  private static BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  private static USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  static async getResumeScore(resumeFile: File, userId: string): Promise<ResumeScoreResponse> {
    if (this.USE_MOCK) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ success: true, scores: MOCK_SCORES.scores });
        }, 1500);
      });
    }

    try {
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const response = await fetch(`${this.BASE_URL}/score/`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { success: false, error: result.message || 'Failed to analyze resume' };
      }

      return { success: true, scores: result.scores };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'An error occurred'
      };
    }
  }
} 