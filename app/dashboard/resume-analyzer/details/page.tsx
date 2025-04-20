'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { DetailCard } from './components/DetailCard';
import { FileText } from 'lucide-react';
import { Suspense } from 'react';

interface ResumeAnalysisData {
  overall_summary: string;
  detailed_evaluation: Array<{
    criterion: string;
    description: string;
    score: number;
    status: 'green' | 'yellow' | 'red';
    assessment: string;
  }>;
}

function ResumeATSDetailsContent() {
  const searchParams = useSearchParams();
  const analysisDataParam = searchParams?.get('analysisData');
  const analysisData = analysisDataParam ? JSON.parse(decodeURIComponent(analysisDataParam)) as ResumeAnalysisData : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Overall Summary */}
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Resume Analysis Summary</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {analysisData?.overall_summary || 'No summary available'}
            </p>
          </CardContent>
        </Card>

        {/* Detailed Evaluation Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Detailed Evaluation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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