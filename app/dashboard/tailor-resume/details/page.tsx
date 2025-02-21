'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, ArrowUpCircle } from 'lucide-react';
import { Suspense } from 'react';

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

function TailorResumeDetailsContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const tailoredData = dataParam ? JSON.parse(atob(dataParam)) : null;

  const renderHighlightedText = (text: string, color: string) => {
    const bgColorMap = {
      yellow: 'bg-yellow-100',
      green: 'bg-green-100',
      blue: 'bg-blue-100'
    };
    
    return (
      <div className={`p-3 rounded-md ${bgColorMap[color as keyof typeof bgColorMap] || 'bg-gray-100'}`}>
        {text}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Card className="p-6">
              <div className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/dashboard/tailor-resume">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Tailor Resume
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
                  <h2 className="text-2xl font-bold">Resume Tailoring Results</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {tailoredData?.sections ? (
                  <>
                    {/* Summary Section */}
                    {tailoredData.sections.summary && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Summary</h3>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Current:</p>
                          <div className="p-3 bg-gray-100 rounded-md">
                            {tailoredData.sections.summary.current_text}
                          </div>
                          <p className="text-sm text-gray-600">Suggested:</p>
                          {renderHighlightedText(
                            tailoredData.sections.summary.suggested_text,
                            tailoredData.sections.summary.highlight_color
                          )}
                        </div>
                      </div>
                    )}

                    {/* Experience Section */}
                    {tailoredData.sections.experience && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Experience</h3>
                        {tailoredData.sections.experience.map((exp: Experience, index: number) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <h4 className="font-medium">{exp.position} at {exp.company}</h4>
                            {exp.improvements.map((improvement, i) => (
                              <div key={i} className="space-y-2">
                                <p className="text-sm text-gray-600">Current:</p>
                                <div className="p-3 bg-gray-100 rounded-md">
                                  {improvement.current_text}
                                </div>
                                <p className="text-sm text-gray-600">Suggested:</p>
                                {renderHighlightedText(
                                  improvement.suggested_text,
                                  improvement.highlight_color
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Sections */}
                    {tailoredData.sections.new_sections && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Suggested New Sections</h3>
                        {tailoredData.sections.new_sections.map((section: NewSection, index: number) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-medium">{section.title}</h4>
                            {renderHighlightedText(
                              section.content,
                              section.highlight_color
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-gray-600">No results available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TailorResumeDetails() {
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
      <TailorResumeDetailsContent />
    </Suspense>
  );
} 