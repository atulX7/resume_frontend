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
  private static USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

  static async tailorResume(data: TailorResumeData): Promise<TailorResumeResponse> {
    try {
      if (this.USE_MOCK) {
        return {
          success: true,
          data: {
            sections: {
              summary: {
                current_text: "",
                suggested_text: "Director-Level Data Scientist with extensive experience in developing data products and machine learning models, specializing in Risk, Fraud, and portfolio management. Proven track record of delivering business value through innovative solutions and stakeholder management.",
                highlight_color: "yellow"
              },
              experience: [
                {
                  position: "Cloud Engineer",
                  company: "Company XX",
                  improvements: [
                    {
                      current_text: "Replaced the existing infrastructure with IaC using Cloud Deployment Manager and Terraform.",
                      suggested_text: "Led the architecture transformation by implementing Infrastructure-as-Code (IaC) with Cloud Deployment Manager and Terraform, enhancing deployment efficiency by 40%.",
                      highlight_color: "green"
                    },
                    {
                      current_text: "Build and maintain software documentation sites using various programming languages involving Python, Java and Go",
                      suggested_text: "Developed and maintained comprehensive software documentation utilizing Python, Java, and Go, streamlining knowledge sharing and collaboration across teams.",
                      highlight_color: "green"
                    }
                  ]
                },
                {
                  position: "Support Engineer",
                  company: "Company XY",
                  improvements: [
                    {
                      current_text: "Built and maintained cloud deployments for over 75 clients.",
                      suggested_text: "Spearheaded the deployment and management of cloud infrastructures for over 75 clients, leveraging Google Cloud services to boost operational efficiency.",
                      highlight_color: "green"
                    },
                    {
                      current_text: "Developed an in-house monitoring and alerting agent for the entire infrastructure deployed on Cloud. Leading to $100k reduction in the infrastructure spend.",
                      suggested_text: "Architected an in-house monitoring and alerting solution that reduced infrastructure costs by $100k through enhanced resource utilization and proactive issue resolution.",
                      highlight_color: "green"
                    }
                  ]
                }
              ],
              new_sections: [
                {
                  title: "Professional Summary",
                  content: "Experienced Cloud and Data Professional with expertise in building scalable data solutions and cloud architectures. Strong leadership skills in managing cross-functional teams to deliver high-impact projects.",
                  highlight_color: "blue"
                },
                {
                  title: "Certifications",
                  content: "AWS Certified Solutions Architect - Associate (2022-2025)",
                  highlight_color: "blue"
                }
              ]
            }
          }
        };
      }

      const formData = new FormData();
      formData.append('job_title', data.jobTitle);
      formData.append('job_description', data.jobDescription);
      formData.append('skills', data.skills);
      formData.append('user_resume', data.resumeFile);

      const response = await fetch(`${this.BASE_URL}/ai-resume/tailor`, {
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