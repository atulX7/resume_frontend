import { FileText, Wand2, FileSearch, ScrollText, DollarSign } from 'lucide-react'

export const siteConfig = {
  name: "Boost Resume",
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
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: DollarSign
    },
  ],
} 