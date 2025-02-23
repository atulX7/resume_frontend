'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useUser } from '@/lib/user';
import { ResumeService } from '@/services/resume-service';
import { toast } from "sonner";

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
      const resumeFile = e.target.files[0];
      setFile(resumeFile);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please login to analyze your resume.",
      });
      return;
    }

    if (!file) {
      toast.error("File Required", {
        description: "Please select a resume file first.",
      });
      return;
    }

    setLoading(true);
    
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API URL is not configured');
      }

      const response = await ResumeService.getResumeScore(file, user.id);
      
      if (response.success && response.scores) {
        setScores({ scores: response.scores });
        toast.success("Analysis Complete");
        window.location.href = `/dashboard/resume-ATS/details?scores=${encodeURIComponent(JSON.stringify(response.scores))}`;
      } else {
        toast.error("Analysis Failed", {
          description: response.error || "Failed to analyze resume. Please try again.",
        });
      }
    } catch (error) {
      console.error('Resume analysis error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message.includes('CONNECTION_REFUSED')
          ? "Cannot connect to the analysis server. Please ensure the server is running and try again."
          : error.message.includes('API URL is not configured')
            ? "Application configuration error. Please contact support."
            : error.message
        : "An unexpected error occurred. Please try again.";
        
      toast.error("Error", {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">EVAL My Resume</h1>
      
      <Card className="p-6 mb-8">
        <div className="flex flex-col items-center">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-200">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-sm">Select your resume</span>
            <input type='file' className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
          </label>
          {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
          
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
      </Card>

      {loading && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Analyzing your resume...</p>
        </div>
      )}
    </div>
  );
}
