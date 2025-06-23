'use client';

import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { RecommendationsCard } from './components/RecommendationsCard';
import { ResumeAnalysisCard } from './components/ResumeAnalysisCard';
import { TailoredData, ParsedData, ExperienceImprovement } from './types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

function TailorResumeDetailsContent() {
  const router = useRouter();
  const [tailoredData, setTailoredData] = useState<TailoredData | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Read analysis data from sessionStorage
      const storedData = sessionStorage.getItem('resumeTailorData');
      if (!storedData) {
        throw new Error('No data found. Please analyze your resume first.');
      }

      const parsed = JSON.parse(storedData);
      setParsedData(parsed);
      setTailoredData({
        sections: {
          summary: parsed.review_suggestions.summary,
          experience: parsed.review_suggestions.experience.map((exp: ExperienceImprovement) => ({
            position: exp.position,
            company: exp.company,
            improvements: exp.modified_points,
            matched_points: exp.matched_points,
            missing_points: exp.missing_points
          })),
          new_sections: parsed.review_suggestions.new_sections
        }
      });
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    // Set localStorage variable if not already set
    if (typeof window !== "undefined" && !localStorage.getItem("showRatingDialog")) {
      localStorage.setItem("showRatingDialog", "true");
    }
  }, []);

  const renderHighlightedText = (text: string, color: string) => {
    const bgColorMap: Record<string, string> = {
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900',
      green: 'bg-green-100 border-green-300 text-green-900',
      blue: 'bg-blue-100 border-blue-300 text-blue-900',
    };

    return (
      <div className={`p-3 sm:p-4 rounded-lg border text-sm sm:text-base ${bgColorMap[color] || 'bg-indigo-100 border-indigo-300 text-indigo-900'}`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-900 flex flex-col gap-4 py-6 sm:py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <Button
          variant="outline"
          className="mb-4 sm:mb-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => router.push('/dashboard/resume-refiner')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back to Resume Analyzer</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="w-full lg:max-w-[65%]">
            <ResumeAnalysisCard
              error={error}
              tailoredData={tailoredData}
              parsedData={parsedData}
              renderHighlightedText={renderHighlightedText}
            />
          </div>

          {parsedData && tailoredData?.sections && (
            <div className="w-full lg:w-[35%] order-first lg:order-last">
              <div className="lg:sticky lg:top-8">
                <RecommendationsCard
                  recommendations={parsedData.review_suggestions.recommendations}
                  finalNotes={parsedData.review_suggestions.final_notes}
                  skillsData={parsedData.review_suggestions.skills}
                  jdAlignment={parsedData.review_suggestions.jd_alignment_summary}
                  sectionScores={parsedData.review_suggestions.section_scores}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TailorResumeDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-indigo-800">Optimizing your resume...</div>}>
      <TailorResumeDetailsContent />
    </Suspense>
  );
}
