'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { DetailCard } from './components/DetailCard';
import { FileText, ArrowLeft } from 'lucide-react';
import { Suspense, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ResumeAnalysisData {
  overall_score: number;
  overall_summary: string;
  detailed_evaluation: Array<{
    criterion: string;
    description: string;
    score: number;
    status: 'green' | 'yellow' | 'red';
    assessment: string;
  }>;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

function CircularProgress({ score }: { score: number }) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const colorClass = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 transform -rotate-90">
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${colorClass}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-2xl font-semibold ${colorClass}`}>
          {Math.round(score)}%
        </span>
      </div>
    </div>
  );
}

function ResumeATSDetailsContent() {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<ResumeAnalysisData | null>(null);

  useEffect(() => {
    // Read analysis data from sessionStorage
    const storedData = sessionStorage.getItem('resumeAnalysisData');
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
    } else {
      // If no data found, redirect back to analyzer
      router.push('/dashboard/resume-analyzer');
    }
  }, [router]);

  if (!analysisData) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => router.push('/dashboard/resume-analyzer')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Analyze New Resume</span>
          <span className="sm:hidden">Back</span>
        </Button>

        {/* Overall Summary with Score */}
        <Card className="border-2 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Resume Analysis Summary</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
              <div className="flex flex-col items-center space-y-2">
                <CircularProgress score={analysisData?.overall_score || 0} />
                <p className={`text-xs sm:text-sm font-medium ${getScoreColor(analysisData?.overall_score || 0)}`}>
                  ATS Friendly Score
                </p>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {analysisData?.overall_summary || 'No summary available'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Evaluation Grid */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">Detailed Evaluation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {analysisData?.detailed_evaluation.map((evaluation, index) => (
              <DetailCard key={index} evaluation={evaluation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeATSDetails() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>}>
      <ResumeATSDetailsContent />
    </Suspense>
  );
}