'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Target, 
  Zap, 
  Trophy, 
  ArrowUpCircle,
  CheckCircle2,
  BarChart,
  Search,
  LucideIcon 
} from 'lucide-react';
import { Suspense } from 'react';

interface ScoreCardProps {
  title: string;
  value: number;
  Icon: LucideIcon;
  description: string;
}

const ScoreCard = ({ title, value, Icon, description }: ScoreCardProps) => {
  return (
    <Card className="p-6 shadow-lg rounded-xl border border-gray-200 bg-white hover:shadow-xl transition-all">
      <CardHeader className="flex items-center gap-4 p-0 pb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center gap-3 mt-2">
          <Progress value={value} className="h-3 rounded bg-gray-200" />
          <span className="text-lg font-semibold text-gray-800">{value}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

const SCORE_CATEGORIES = {
  ats_compatibility: { icon: Search, description: 'How well ATS systems read your resume' },
  content_quality: { icon: CheckCircle2, description: 'Quality and impact of your content' },
  formatting: { icon: FileText, description: 'Layout and visual organization' },
  keyword_optimization: { icon: Target, description: 'Relevant keyword usage' },
  impact_metrics: { icon: BarChart, description: 'Quantifiable achievements' },
  overall_effectiveness: { icon: Zap, description: 'Overall resume effectiveness' }
};

function ResumeATSDetailsContent() {
  const searchParams = useSearchParams();
  const scoresParam = searchParams.get('scores');
  const scores = scoresParam ? JSON.parse(decodeURIComponent(scoresParam)) as Record<string, number> : null;
  
  const overallScore = scores ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length) : 0;
  
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6 shadow-lg text-center bg-white rounded-xl border border-gray-200">
          <div className="w-32 h-32 rounded-full border-8 border-blue-200 flex items-center justify-center mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600">{overallScore}</div>
              <div className="text-sm text-gray-500">out of 100</div>
            </div>
          </div>
          {overallScore >= 90 && <Trophy className="h-10 w-10 text-yellow-500 mx-auto mt-4" />}
          <h3 className="font-semibold text-xl text-gray-900 mt-4">Overall Score</h3>
          <p className="text-sm text-gray-500">{overallScore >= 90 ? 'Top 5% of all resumes' : 'Based on ATS analysis'}</p>
        </Card>
        <div className="col-span-2 space-y-6">
          <Card className="p-6 shadow-lg bg-white rounded-xl border border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <ArrowUpCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Resume Analysis Results</h2>
            </CardHeader>
            <p className="text-gray-600">{overallScore >= 90 ? 'Excellent! Your resume is in the top 5%.' : 'Here’s how your resume performs.'}</p>
          </Card>
          {scores ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(scores).map(([key, value]) => {
                const category = SCORE_CATEGORIES[key as keyof typeof SCORE_CATEGORIES] || { icon: Target, description: 'Score analysis' };
                return (
                  <ScoreCard key={key} title={key.replace(/_/g, ' ')} value={value} Icon={category.icon} description={category.description} />
                );
              })}
            </div>
          ) : (
            <Card className="p-6 shadow-lg bg-white rounded-xl border border-gray-200">
              <p className="text-center text-gray-600">No analysis results available</p>
            </Card>
          )}
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