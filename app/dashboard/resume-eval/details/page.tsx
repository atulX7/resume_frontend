'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { 
  FileText, 
  Target, 
  Zap, 
  Trophy, 
  Home, 
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
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Work';
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon size={20} className={getScoreColor(value)} />
            </div>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
          <Badge variant={value >= 90 ? 'default' : value >= 70 ? 'outline' : 'destructive'}>
            {getScoreText(value)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex items-center gap-2">
          <Progress 
            value={value} 
            className={`h-2 bg-gray-100 [&>div]:${value >= 90 ? 'bg-green-500' : value >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
          />
          <span className={`text-lg font-bold ${getScoreColor(value)} min-w-[3rem] text-right`}>
            {value}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const SCORE_CATEGORIES = {
  ats_compatibility: {
    icon: Search,
    description: 'How well ATS systems can read your resume'
  },
  content_quality: {
    icon: CheckCircle2,
    description: 'Quality and impact of your content'
  },
  formatting: {
    icon: FileText,
    description: 'Layout and visual organization'
  },
  keyword_optimization: {
    icon: Target,
    description: 'Relevant keyword usage and placement'
  },
  impact_metrics: {
    icon: BarChart,
    description: 'Quantifiable achievements and results'
  },
  overall_effectiveness: {
    icon: Zap,
    description: 'Overall resume effectiveness score'
  }
};

function ResumeATSDetailsContent() {
  const searchParams = useSearchParams();
  const scoresParam = searchParams.get('scores');
  const scores = scoresParam ? JSON.parse(decodeURIComponent(scoresParam)) as Record<string, number> : null;

  const calculateOverallScore = (scores: Record<string, number>) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const overallScore = scores ? calculateOverallScore(scores) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Card className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-36 h-36 rounded-full border-8 border-blue-100 flex items-center justify-center mx-auto bg-white">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-600">{overallScore}</div>
                      <div className="text-sm text-gray-500">out of 100</div>
                    </div>
                  </div>
                  {overallScore >= 90 && (
                    <div className="absolute -top-2 -right-2">
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">OVERALL SCORE</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {overallScore >= 90 ? 'Top 5% of all resumes' : 'Based on ATS analysis'}
                  </p>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/resume-ATS">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Upload
                  </Link>
                </Button>
              </div>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-9">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                  <h2 className="text-2xl font-bold">Resume Analysis Results</h2>
                </div>
                <p className="text-gray-600">
                  {scores && overallScore >= 90 
                    ? 'Excellent! Your resume is in the top 5% of all resumes we\'ve analyzed.' 
                    : 'Here\'s how your resume performs against our ATS criteria.'}
                </p>
              </CardHeader>
            </Card>

            {scores ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(scores).map(([key, value]) => {
                  const category = SCORE_CATEGORIES[key as keyof typeof SCORE_CATEGORIES] || {
                    icon: Target,
                    description: 'Score analysis'
                  };
                  
                  return (
                    <ScoreCard
                      key={key}
                      title={key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      value={value}
                      Icon={category.icon}
                      description={category.description}
                    />
                  );
                })}
              </div>
            ) : (
              <Card className="p-6">
                <p className="text-center text-gray-600">No analysis results available</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResumeATSDetails() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50/50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-600">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <ResumeATSDetailsContent />
    </Suspense>
  );
} 