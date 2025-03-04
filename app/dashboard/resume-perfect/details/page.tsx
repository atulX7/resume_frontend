'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowUpCircle, 
  Edit, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';

interface Experience {
  position: string;
  company: string;
  improvements: {
    current_text: string;
    suggested_text: string;
    highlight_color: string;
  }[];
}

interface NewSection {
  title: string;
  content: string;
  highlight_color: string;
}

interface TailoredData {
  sections: {
    summary?: {
      current_text: string;
      suggested_text: string;
      highlight_color: string;
    };
    experience?: Experience[];
    new_sections?: NewSection[];
  };
}

function TailorResumeDetailsContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [tailoredData, setTailoredData] = useState<TailoredData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!dataParam || dataParam.trim() === '') {
        throw new Error('No data found in URL parameters.');
      }
      const decodedData = atob(dataParam);
      const parsedData = JSON.parse(decodedData);
      const reviewSuggestionsString = parsedData.review_suggestions.replace(/^json\n/, '').trim();
      const reviewSuggestions = JSON.parse(reviewSuggestionsString);
      setTailoredData(reviewSuggestions);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [dataParam]);

  const renderHighlightedText = (text: string, color: string) => {
    const bgColorMap: Record<string, string> = {
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900',
      green: 'bg-green-100 border-green-300 text-green-900',
      blue: 'bg-blue-100 border-blue-300 text-blue-900',
    };

    return (
      <div className={`p-4 rounded-lg border ${bgColorMap[color] || 'bg-teal-100 border-teal-300 text-teal-900'}`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-teal-50 flex justify-center py-12">
      <div className="w-full max-w-screen-lg bg-white shadow-xl rounded-2xl overflow-hidden">
        {error ? (
          <Card className="bg-red-100 border-red-300 p-6 text-center">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center justify-center">
                <CheckCircle2 className="mr-2 h-6 w-6" /> Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-800">{error}</p>
            </CardContent>
          </Card>
        ) : tailoredData?.sections ? (
          <Card className="p-8">
            <CardHeader className="bg-teal-100/50 p-6 rounded-t-2xl flex items-center gap-4">
              <ArrowUpCircle className="h-8 w-8 text-teal-600" />
              <div>
                <CardTitle className="text-2xl font-bold text-teal-800">
                  Resume Tailoring Insights
                </CardTitle>
                <CardDescription className="text-teal-600">
                  Optimize your resume to stand out
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              {tailoredData.sections.summary && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Edit className="h-6 w-6 text-teal-600" />
                    <h3 className="text-xl font-semibold text-teal-800">
                      Professional Summary
                    </h3>
                  </div>
                  <Separator className="bg-teal-300" />
                  <div className="space-y-3">
                    <p className="text-gray-700 font-medium">Current Summary</p>
                    <div className="p-4 bg-gray-100 rounded-lg">
                      {tailoredData.sections.summary.current_text}
                    </div>
                    <p className="text-gray-700 font-medium">Suggested Summary</p>
                    {renderHighlightedText(
                      tailoredData.sections.summary.suggested_text,
                      tailoredData.sections.summary.highlight_color
                    )}
                  </div>
                </div>
              )}

              {tailoredData.sections.experience && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-teal-800 flex items-center gap-3">
                    <Award className="h-6 w-6 text-teal-600" /> Professional Experience
                  </h3>
                  <Separator className="bg-teal-300" />
                  {tailoredData.sections.experience.map((exp, index) => (
                    <div key={index} className="bg-gray-100 p-6 rounded-xl space-y-4">
                      <h4 className="text-lg font-medium text-teal-800">
                        {exp.position} at {exp.company}
                      </h4>
                      {exp.improvements.map((improvement, i) => (
                        <div key={i} className="space-y-3">
                          <p className="text-gray-700 font-medium">Current Description</p>
                          <div className="p-3 bg-gray-200 rounded-lg">
                            {improvement.current_text}
                          </div>
                          <p className="text-gray-700 font-medium">Enhanced Description</p>
                          {renderHighlightedText(improvement.suggested_text, improvement.highlight_color)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-gray-600 bg-white p-8 rounded-xl shadow-lg">
            <p>No tailoring results available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TailorResumeDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-teal-800">Optimizing your resume...</div>}>
      <TailorResumeDetailsContent />
    </Suspense>
  );
}
