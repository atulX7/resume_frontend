export interface TailorResumeData {
  jobTitle: string;
  jobDescription: string;
  skills: string;
  resumeFile: File;
}

export interface ResumeSection {
  current_text: string;
  suggested_text: string;
  highlight_color: string;
}

export interface MatchedPoint {
  text: string;
  justification: string;
  highlight_color: string;
}

export interface ModifiedPoint {
  current_text: string;
  suggested_text: string;
  highlight_color: string;
}

export interface MissingPoint {
  expected_topic: string;
  suggestion: string;
  highlight_color: string;
}

export interface ExperienceImprovement {
  position: string;
  company: string;
  matched_points: MatchedPoint[];
  modified_points: ModifiedPoint[];
  missing_points: MissingPoint[];
}

export interface SkillMapping {
  skill: string;
  currently_in_resume: boolean;
  recommended_section: string;
  action: string;
}

export interface SkillsAnalysis {
  used_well: string[];
  underutilized: string[];
  missing_keywords: string[];
  suggested_action: string;
}

export interface JdAlignmentSummary {
  total_jd_points: number;
  matched: number;
  partially_matched: number;
  missing: number;
  match_score_percent: number;
}

export interface SectionScores {
  summary: number;
  experience: number;
  skills: number;
  projects: number;
  education: number;
}

export interface NewSection {
  title: string;
  content: string;
  highlight_color: string;
}

export interface ReviewSuggestions {
  summary: ResumeSection;
  experience: ExperienceImprovement[];
  user_skills_mapping: SkillMapping[];
  skills: SkillsAnalysis;
  jd_alignment_summary: JdAlignmentSummary;
  section_scores: SectionScores;
  new_sections: NewSection[];
  recommendations: string[];
  final_notes: string[];
}

export interface TailorResumeResponse {
  success: boolean;
  data?: {
    review_suggestions: ReviewSuggestions;
  };
  error?: string;
}

export interface ParsedData {
  review_suggestions: ReviewSuggestions;
}

export interface TailoredExperience {
  position: string;
  company: string;
  improvements: ModifiedPoint[];
  matched_points: MatchedPoint[];
  missing_points: MissingPoint[];
}

export interface TailoredData {
  sections: {
    summary?: ResumeSection;
    experience?: TailoredExperience[];
    new_sections?: NewSection[];
  };
}