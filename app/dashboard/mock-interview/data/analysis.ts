export const INTERVIEW_ANALYSIS = {
  overallScore: 85,
  duration: "25 minutes",
  confidence: 82,
  eyeContact: 78,
  speakingPace: 88,
  metrics: [
    { name: "Communication", score: 85 },
    { name: "Technical Knowledge", score: 82 },
    { name: "Problem Solving", score: 88 },
    { name: "Cultural Fit", score: 90 }
  ],
  questions: [
    {
      question: "Tell me about yourself and your experience in this field.",
      feedback: "Strong introduction, but could provide more specific examples of achievements.",
      score: 85,
      improvements: [
        "Include quantifiable achievements",
        "Mention specific technologies used",
        "Shorten the response by 20%"
      ]
    },
    {
      question: "What interests you about this position at our company?",
      feedback: "Excellent company research demonstrated, good alignment with role.",
      score: 92,
      improvements: [
        "Elaborate more on future goals",
        "Connect past experiences to role requirements"
      ]
    },
    {
      question: "Describe a challenging project you've worked on.",
      feedback: "Good structure but could improve on outcome description.",
      score: 88,
      improvements: [
        "Emphasize the impact of your solution",
        "Include more technical details",
        "Use the STAR method more explicitly"
      ]
    }
  ],
  keywordAnalysis: {
    positiveKeywords: ["innovative", "collaborative", "leadership", "problem-solving"],
    missingKeywords: ["agile", "scalability", "user-centric"],
    overusedWords: ["basically", "like", "you know"]
  }
} 