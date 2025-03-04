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
      if (response.success && response.scores) {
        setScores({ scores: response.scores });
        toast.success('Analysis Complete');
        window.location.href = `/dashboard/resume-eval/details?scores=${encodeURIComponent(
          JSON.stringify(response.scores)
        )}`;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-50 px-6">
      <h1 className="text-4xl font-bold text-teal-600 mb-6">EVAL My Resume</h1>
      <Card className="p-8 shadow-xl rounded-2xl bg-white max-w-lg w-full flex flex-col items-center">
        <Image
          src="/images/resume-analysis.svg"
          alt="Resume Analysis"
          width={300}
          height={200}
          className="mb-4"
        />
        <label className="w-64 flex flex-col items-center px-6 py-4 border-2 border-dashed border-teal-500 rounded-lg cursor-pointer hover:bg-teal-100 transition">
          <Upload className="h-8 w-8 text-teal-500" />
          <span className="mt-2 text-teal-600 text-sm">Select your resume</span>
          <input type='file' className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
        </label>
        {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
        <Button
          onClick={handleSubmit}
          disabled={!file || loading}
          className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Analyze Resume'}
        </Button>
      </Card>

      {loading && (
        <div className="text-center mt-6">
          <Loader2 className="animate-spin h-12 w-12 text-teal-500 mx-auto" />
          <p className="mt-4 text-gray-600">Analyzing your resume...</p>
        </div>
      )}
    </div>
  );
}