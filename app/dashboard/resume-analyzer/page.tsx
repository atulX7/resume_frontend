'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/user';
import { ResumeService } from '@/services/resume-service';
import { toast } from 'sonner';
import { Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResumeATS() {
  const router = useRouter();
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false)

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

    if (!acceptedTerms) {
      toast.error('Agreement Required', {
        description: 'Please agree to the terms and privacy policy.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await ResumeService.getResumeScore(file);
      if (response.success && response.data) {
        toast.success('Analysis Complete');
        
        // Store analysis data in sessionStorage
        sessionStorage.setItem('resumeAnalysisData', JSON.stringify(response.data));
        
        // Navigate to details page without query parameters
        router.push('/dashboard/resume-analyzer/details');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 dark:bg-gray-900 px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 sm:mb-6 text-center">Resume Analyzer</h1>
      <Card className="p-4 sm:p-8 shadow-xl rounded-2xl bg-white dark:bg-gray-800 max-w-lg w-full flex flex-col items-center">
        <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-[160px] sm:h-[200px] mb-4">
          <Image
            src="/images/resume-analysis.svg"
            alt="Resume Analysis"
            fill
            className="object-contain"
            priority
          />
        </div>
        <label className="w-full max-w-[240px] sm:w-64 flex flex-col items-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-indigo-500 dark:border-indigo-400 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
          <Upload className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-500 dark:text-indigo-400" />
          <span className="mt-2 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm text-center">Select your resume</span>
          <input type='file' className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
        </label>
        {file && <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 text-center break-all max-w-full px-4">{file.name}</p>}

        {/* Added margin-top to create space */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-6 rounded-xl mt-4 sm:mt-8 w-full">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              I have read and agree to the{" "}
              <Link 
                href="/legal/terms" 
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Terms and Conditions
              </Link>
              {" "}and{" "}
              <Link 
                href="/legal/privacy-policy" 
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!file || loading || !acceptedTerms}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white px-4 sm:px-6 py-2 rounded-lg transition disabled:bg-gray-400 dark:disabled:bg-gray-600 text-sm sm:text-base w-full max-w-[240px] sm:max-w-none"
        >
          {loading ? <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 animate-spin" /> : 'Analyze Resume'}
        </Button>
      </Card>

      {loading && (
        <div className="text-center mt-6">
          <Loader2 className="animate-spin h-8 sm:h-12 w-8 sm:w-12 text-indigo-500 dark:text-indigo-400 mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">Analyzing your resume...</p>
        </div>
      )}
    </div>
  );
}