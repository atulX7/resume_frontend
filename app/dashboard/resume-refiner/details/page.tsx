'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { RecommendationsCard } from './components/RecommendationsCard';
import { ResumeAnalysisCard } from './components/ResumeAnalysisCard';
import { TailoredData, ParsedData, ExperienceImprovement} from './types';


function TailorResumeDetailsContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams?.get('data');
  const [tailoredData, setTailoredData] = useState<TailoredData | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!dataParam || dataParam.trim() === '') {
        throw new Error('No data found in URL parameters.');
      }
      const parsed = JSON.parse(dataParam);
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
  }, [dataParam]);

  const renderHighlightedText = (text: string, color: string) => {
    const bgColorMap: Record<string, string> = {
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900',
      green: 'bg-green-100 border-green-300 text-green-900',
      blue: 'bg-blue-100 border-blue-300 text-blue-900',
    };

    return (
      <div className={`p-4 rounded-lg border ${bgColorMap[color] || 'bg-indigo-100 border-indigo-300 text-indigo-900'}`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex justify-center gap-4 py-12 px-8">
      <ResumeAnalysisCard
        error={error}
        tailoredData={tailoredData}
        parsedData={parsedData}
        renderHighlightedText={renderHighlightedText}
      />
      {parsedData && tailoredData?.sections && (
        <div className="w-96 sticky top-8 self-start">
          <RecommendationsCard 
            recommendations={parsedData.review_suggestions.recommendations}
            finalNotes={parsedData.review_suggestions.final_notes}
            skillsData={parsedData.review_suggestions.skills}
            jdAlignment={parsedData.review_suggestions.jd_alignment_summary}
            sectionScores={parsedData.review_suggestions.section_scores}
          />
        </div>
      )}
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
