import { FileText, Wand2, FileSearch, ScrollText, MessageSquare } from 'lucide-react'

export const siteConfig = {
  name: "ResuWin",
  description: "Create professional resumes and cover letters",
  mainNav: [
    {
      title: "Resume",
      href: "/resume",
      icon: ScrollText,
      items: [
        {
          title: "Resume Builder",
          href: "/resume/builder",
          description: "Build your professional resume with our easy-to-use builder",
          icon: FileText
        },
        {
          title: "Enhance Resume",
          href: "/resume/enhance",
          description: "Improve your existing resume with AI-powered suggestions",
          icon: Wand2
        },
        {
          title: "ATS Score Check",
          href: "/resume/ats-check",
          description: "Check how well your resume performs against ATS systems",
          icon: FileSearch
        },
        {
          title: "Interview Practice",
          href: "/resume/interview",
          description: "Practice your interview skills with our AI-powered mock interviews",
          icon: MessageSquare
        },
      ],
    },
  ],
} 