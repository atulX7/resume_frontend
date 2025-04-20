'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/user';
import { ResumeService } from '@/services/resume-service';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ATSScore {
  scores: {
    [key: string]: number;
  };
}

export default function ResumeATS() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [, setScores] = useState<ATSScore | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Authentication Required', {
        description: 'Please login to analyze your resume.',
      });
      return;
    }

    if (!file) {
      toast.error('File Required', {
        description: 'Please select a resume file first.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ResumeService.getResumeScore(file);
      if (response.success && response.data) {
        setScores({ scores: response.data.scores });
        toast.success('Analysis Complete');
        
        // Redirect with all analysis data
        const queryParams = new URLSearchParams({
          scores: JSON.stringify(response.data.scores),
          analysisData: JSON.stringify({
            overall_summary: response.data.overall_summary,
            detailed_evaluation: response.data.detailed_evaluation
          })
        });
        
        window.location.href = `/dashboard/resume-analyzer/details?${queryParams.toString()}`;
      } else {
        toast.error('Analysis Failed', {
          description: response.error || 'Failed to analyze resume. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('Error', {
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 dark:bg-gray-900 px-6">
      <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">Resume Analyzer</h1>
      <Card className="p-8 shadow-xl rounded-2xl bg-white dark:bg-gray-800 max-w-lg w-full flex flex-col items-center">
        <Image
          src="/images/resume-analysis.svg"
          alt="Resume Analysis"
          width={300}
          height={200}
          className="mb-4"
        />
        <label className="w-64 flex flex-col items-center px-6 py-4 border-2 border-dashed border-indigo-500 dark:border-indigo-400 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
          <Upload className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
          <span className="mt-2 text-indigo-600 dark:text-indigo-400 text-sm">Select your resume</span>
          <input type='file' className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
        </label>
        {file && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{file.name}</p>}
        <Button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition disabled:bg-gray-400 dark:disabled:bg-gray-600"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Analyze Resume'}
        </Button>
      </Card>

      {loading && (
        <div className="text-center mt-6">
          <Loader2 className="animate-spin h-12 w-12 text-indigo-500 dark:text-indigo-400 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing your resume...</p>
        </div>
      )}
    </div>
  );
}