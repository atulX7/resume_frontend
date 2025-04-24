import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit, Award, CheckCircle2 } from 'lucide-react';
import { TailoredData, ParsedData } from '../types';
import { Star } from 'lucide-react';

interface ResumeAnalysisCardProps {
  error: string | null;
  tailoredData: TailoredData | null;
  parsedData: ParsedData | null;
  renderHighlightedText: (text: string, color: string) => JSX.Element;
}

export function ResumeAnalysisCard({ error, tailoredData, parsedData, renderHighlightedText }: ResumeAnalysisCardProps) {
  return (
    <div className="w-full max-w-4xl">
      {error ? (
        <Card className="bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700 p-6 text-center">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-300 flex items-center justify-center">
              <CheckCircle2 className="mr-2 h-6 w-6" /> Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </CardContent>
        </Card>
      ) : tailoredData?.sections ? (
        <div className="space-y-6">
          <Card className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border-t-4 border-indigo-500 dark:border-indigo-400">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 flex items-center gap-4">
              <Star className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
                  Resume Enhancement Report
                </CardTitle>
                <CardDescription className="text-indigo-600 dark:text-indigo-300">
                  Detailed analysis and improvements
                </CardDescription>
              </div>
            </CardHeader>

            {/* <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-y border-indigo-100">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Section Performance</h3>
              <div className="grid grid-cols-5 gap-4">
                {parsedData && Object.entries(parsedData.review_suggestions.section_scores).map(([section, score]) => (
                  <div key={section} className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${
                        score >= 80 ? 'text-green-600' :
                        score >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {score}%
                      </div>
                      <div className="text-sm text-gray-600 capitalize mt-1">{section}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <CardContent className="p-8 space-y-8">
              {/* Summary Section */}
              {tailoredData.sections.summary && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Edit className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                      Professional Summary
                    </h3>
                  </div>
                  <Separator className="bg-indigo-300 dark:bg-indigo-600" />
                  <div className="space-y-3">
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Current Summary</p>
                    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {tailoredData.sections.summary.current_text}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Suggested Summary</p>
                    {renderHighlightedText(
                      tailoredData.sections.summary.suggested_text,
                      tailoredData.sections.summary.highlight_color
                    )}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {parsedData?.review_suggestions.experience && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 flex items-center gap-3">
                    <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Professional Experience
                  </h3>
                  <Separator className="bg-indigo-300 dark:bg-indigo-600" />
                  {parsedData.review_suggestions.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl space-y-6">
                      <h4 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
                        {exp.position} at {exp.company}
                      </h4>

                      {/* Matched Points */}
                      {exp.matched_points.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">Strong Points</p>
                          {exp.matched_points.map((point, i) => (
                            <div key={i} className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg space-y-2">
                              <p className="text-green-800 dark:text-green-200">{point.text}</p>
                              <p className="text-sm text-green-600 dark:text-green-400">{point.justification}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Modified Points */}
                      {exp.modified_points.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">Suggested Improvements</p>
                          {exp.modified_points.map((point, i) => (
                            <div key={i} className="space-y-3">
                              <div className="p-3 bg-gray-200 dark:bg-gray-600 rounded-lg">
                                {point.current_text}
                              </div>
                              {renderHighlightedText(point.suggested_text, point.highlight_color)}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Missing Points */}
                      {exp.missing_points.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">Missing Elements</p>
                          {exp.missing_points.map((point, i) => (
                            <div key={i} className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg space-y-2">
                              <p className="text-amber-800 dark:text-amber-200 font-medium">{point.expected_topic}</p>
                              <p className="text-amber-700 dark:text-amber-300">{point.suggestion}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <p>No tailoring results available</p>
        </div>
      )}
    </div>
  );
}