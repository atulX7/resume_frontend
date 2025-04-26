'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Star, Award } from 'lucide-react';
import { ResumeTailorService } from '@/services/resume-tailor-service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TailorResumePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    skills: '',
    resumeFile: null as File | null,
  });
  const [, setTailoredResume] = useState<{
    review_suggestions?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Add validation function
  const isFormValid = () => {
    return (
      formData.jobTitle.trim() !== '' &&
      formData.jobDescription.trim() !== '' &&
      formData.skills.trim() !== '' &&
      formData.resumeFile !== null &&
      acceptedTerms
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTailoredResume(null);
    setIsLoading(true);

    if (!formData.resumeFile) {
      console.error('No resume file selected');
      setIsLoading(false);
      return;
    }

    try {
      const response = await ResumeTailorService.tailorResume({
        jobTitle: formData.jobTitle,
        jobDescription: formData.jobDescription,
        skills: formData.skills,
        resumeFile: formData.resumeFile
      });

      if (response.success && response.data) {
        const queryParams = new URLSearchParams({
          data: JSON.stringify(response.data)
        });
        router.push(`/dashboard/resume-refiner/details?${queryParams.toString()}`);
      } else {
        console.error('Failed to tailor resume:', response.error);
      }
    } catch (error) {
      console.error('Error tailoring resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-indigo-800 dark:text-indigo-400 mb-4 flex items-center justify-center">
            <Award className="w-12 h-12 mr-4 text-indigo-600 dark:text-indigo-400" />
            Resume Tailoring Wizard
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300 max-w-2xl mx-auto">
            Transform your resume to perfectly match your dream job. Our intelligent tailoring service helps you highlight your most relevant skills and experiences.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden ring-4 ring-indigo-200 dark:ring-indigo-500 ring-opacity-50">
          <div className="p-8 space-y-6">
            <div className="flex items-center bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg">
              <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">Boost Your Job Application</h2>
                <p className="text-indigo-600 dark:text-indigo-300 text-sm">
                  Customize your resume to match the job description and increase your chances of getting an interview.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="jobTitle"
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    required
                    className="border-indigo-300 dark:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                    Your Skills <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="Python, React, SQL"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    required
                    className="border-indigo-300 dark:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  required
                  rows={5}
                  className="border-indigo-300 dark:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="resumeFile" className="block text-sm font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files?.[0] || null })}
                    required
                    className="border-indigo-300 dark:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500"
                  />
                  <FileText className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                </div>
              </div>

              {/* Added margin-top to create space */}
              <div className="bg-gray-50 p-6 rounded-xl mt-8">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                  I have read and agree to the{" "}
                  <Link 
                    href="/legal/terms" 
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                  {" "}and{" "}
                  <Link 
                    href="/legal/privacy-policy" 
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  <span className="text-red-500">*</span>
                </label>
              </div>
            </div>

              <Button 
                type="submit" 
                disabled={!isFormValid() || isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Tailoring...' : 'Perfect My Resume'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
