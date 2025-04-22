import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Lightbulb, ListChecks, BarChart2 } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
  finalNotes?: string[];
  skillsData: {
    used_well: string[];
    underutilized: string[];
    missing_keywords: string[];
    suggested_action: string;
  };
  jdAlignment: {
    total_jd_points: number;
    matched: number;
    partially_matched: number;
    missing: number;
    match_score_percent: number;
  };
  sectionScores: {
    summary: number;
    experience: number;
    skills: number;
    projects: number;
    education: number;
  };
}

function PieChart({ percentage }: { percentage: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-28 h-28 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-100"
        />
        {/* Progress circle */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${getScoreColor(percentage)} transition-all duration-1000 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
          {percentage}%
        </span>
        <span className="text-xs text-gray-500">Match</span>
      </div>
    </div>
  );
}

function SectionScoreBar({ label, score }: { label: string; score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 capitalize">{label}</span>
        <span className="text-gray-900 font-medium">{score}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getScoreColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function RecommendationsCard({ recommendations, finalNotes, skillsData, jdAlignment, sectionScores }: RecommendationsProps) {
  return (
    <div className="ml-8 w-96">
      <Card className="bg-white shadow-2xl rounded-2xl overflow-hidden border-t-4 border-blue-500 sticky top-8">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-3 text-xl text-blue-800">
            <Lightbulb className="h-6 w-6 text-blue-500" />
            Resume Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* JD Alignment Score */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl shadow-inner">
            <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-600" />
              Job Match Score
            </h4>
            <div className="flex items-center justify-between">
              <PieChart percentage={jdAlignment.match_score_percent} />
              <div className="flex-1 grid grid-cols-2 gap-2 ml-4">
                <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                  <p className="text-lg font-bold text-green-600">{jdAlignment.matched}</p>
                  <p className="text-xs text-gray-600">Matched</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-sm">
                  <p className="text-lg font-bold text-orange-600">{jdAlignment.partially_matched}</p>
                  <p className="text-xs text-gray-600">Partial</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg shadow-sm col-span-2">
                  <p className="text-lg font-bold text-red-600">{jdAlignment.missing}</p>
                  <p className="text-xs text-gray-600">Missing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Scores */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-600" />
              Section Analysis
            </h4>
            <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-100">
              <SectionScoreBar label="Summary" score={sectionScores.summary} />
              <SectionScoreBar label="Experience" score={sectionScores.experience} />
              <SectionScoreBar label="Skills" score={sectionScores.skills} />
              <SectionScoreBar label="Projects" score={sectionScores.projects} />
              <SectionScoreBar label="Education" score={sectionScores.education} />
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-indigo-600" />
              Skills Overview
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm">
                <h5 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Strong Points
                </h5>
                <div className="flex flex-wrap gap-2">
                  {skillsData.used_well.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-green-700 rounded-full text-sm shadow-sm border border-green-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg shadow-sm">
                <h5 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  To Emphasize
                </h5>
                <div className="flex flex-wrap gap-2">
                  {skillsData.underutilized.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-yellow-700 rounded-full text-sm shadow-sm border border-yellow-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Missing Keywords */}
              <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg shadow-sm">
                <h5 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Missing Keywords
                </h5>
                <div className="flex flex-wrap gap-2">
                  {skillsData.missing_keywords.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-white text-red-700 rounded-full text-sm shadow-sm border border-red-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Action */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg shadow-sm">
                <h5 className="font-medium text-blue-800 mb-2">Action Plan</h5>
                <p className="text-blue-700 text-sm">{skillsData.suggested_action}</p>
              </div>

              {/* JD Alignment Details */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-600">Partial Matches</p>
                  <p className="font-bold text-orange-700">{jdAlignment.partially_matched}</p>
                </div>
                <div className="text-center p-2 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600">Missing Points</p>
                  <p className="font-bold text-red-700">{jdAlignment.missing}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Key Actions
            </h4>
            <ul className="space-y-3">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-amber-500 text-white rounded-full text-sm">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 text-sm">{rec}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Final Notes */}
          {finalNotes && finalNotes.length > 0 && (
            <div className="space-y-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800">Additional Insights</h4>
              <ul className="space-y-2">
                {finalNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-purple-500 mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}