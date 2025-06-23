'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { ResumeService } from '@/services/resume-service';
import { toast } from 'sonner';
import { Upload, Loader2, Award, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RatingDialog } from '@/components/user-dashboard/RatingDialog';
import { submitRating } from '@/services/rating-service';

export default function ResumeATS() {
  const router = useRouter();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showRating, setShowRating] = useState(false);

  // Rating dialog logic
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkAndShowDialog = () => {
      const nextEligible = localStorage.getItem("showRatingDialogNext");
      const now = Date.now();
      if (
        localStorage.getItem("showRatingDialog") === "true" &&
        (!nextEligible || now > Number(nextEligible))
      ) {
        setShowRating(true);
        localStorage.setItem("showRatingDialog", "false");
      }
    };

    // Initial check on mount (for reloads)
    const timer = setTimeout(checkAndShowDialog, 5000);

    // Listen for localStorage changes (for instant show)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "showRatingDialog" && e.newValue === "true") {
        checkAndShowDialog();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleCloseRating = () => {
    setShowRating(false);
    // Set next eligible time to 48 hours from now
    const nextTime = Date.now() + 48 * 60 * 60 * 1000;
    localStorage.setItem("showRatingDialogNext", nextTime.toString());
  };

  const handleSubmitRating = async (rating: number, comment: string) => {
    await submitRating(
      rating,
      comment,
      session?.user?.name ?? undefined,
      session?.user?.email ?? undefined
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!session) {
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
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-900 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800 dark:text-indigo-400 mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <Award className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400" />
            Resume Analyzer
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300 max-w-2xl mx-auto text-sm sm:text-base">
            Analyze your resume&apos;s effectiveness and get instant feedback. Our intelligent analysis helps you understand how well your resume matches industry standards.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden ring-4 ring-indigo-200 dark:ring-indigo-500 ring-opacity-50">
          <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
              <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 text-center sm:text-left">Enhance Your Resume</h2>
                <p className="text-indigo-600 dark:text-indigo-300 text-sm text-center sm:text-left">
                  Get detailed insights about your resume&apos;s strengths and areas for improvement.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full max-w-[240px] sm:max-w-[300px] h-[160px] sm:h-[200px]">
                <Image
                  src="/images/resume-analysis.svg"
                  alt="Resume Analysis"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <label className="w-full max-w-[240px] sm:w-64 flex flex-col items-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-dashed border-indigo-500 dark:border-indigo-400 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition">
                <Upload className="h-6 sm:h-8 w-6 sm:w-8 text-indigo-500 dark:text-indigo-400" />
                <span className="mt-2 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm text-center">Select your resume</span>
                <input type='file' className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
              </label>
              {file && <p className="text-sm text-indigo-600 dark:text-indigo-400 text-center break-all max-w-full px-4">{file.name}</p>}

              <div className="bg-indigo-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl w-full">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-indigo-300 dark:border-indigo-500 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-indigo-800 dark:text-indigo-300">
                    I have read and agree to the{" "}
                    <Link
                      href="/legal/terms"
                      target="_blank"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Terms and Conditions
                    </Link>
                    {" "}and{" "}
                    <Link
                      href="/legal/privacy-policy"
                      target="_blank"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!file || loading || !acceptedTerms}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 h-auto"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze My Resume'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <RatingDialog
        open={showRating}
        onClose={handleCloseRating}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}