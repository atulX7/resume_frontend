'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Star, Award } from 'lucide-react';
import { ResumeTailorService } from '@/services/resume-tailor-service';
import { useRouter } from 'next/navigation';

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
        const encodedData = btoa(JSON.stringify(response.data.sections));
        router.push(`/dashboard/resume-perfect/details?data=${encodedData}`);
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
    <div className="min-h-screen bg-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-teal-800 mb-4 flex items-center justify-center">
            <Award className="w-12 h-12 mr-4 text-teal-600" />
            Resume Tailoring Wizard
          </h1>
          <p className="text-teal-600 max-w-2xl mx-auto">
            Transform your resume to perfectly match your dream job. Our intelligent tailoring service helps you highlight your most relevant skills and experiences.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden ring-4 ring-teal-200 ring-opacity-50">
          <div className="p-8 space-y-6">
            <div className="flex items-center bg-teal-50 p-4 rounded-lg">
              <Star className="h-6 w-6 text-teal-600 mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-teal-800">Boost Your Job Application</h2>
                <p className="text-teal-600 text-sm">
                  Customize your resume to match the job description and increase your chances of getting an interview.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-teal-800 mb-2">
                    Job Title
                  </label>
                  <Input
                    id="jobTitle"
                    type="text"
                    placeholder="e.g., Software Engineer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    required
                    className="border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-teal-800 mb-2">
                  Your Skills
                  </label>
                  <Input
                    id="skills"
                    type="text"
                    placeholder="Python, React, SQL"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    required
                    className="border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-teal-800 mb-2">
                  Job Description
                </label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                  value={formData.jobDescription}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  required
                  rows={5}
                  className="border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="resumeFile" className="block text-sm font-medium text-teal-800 mb-2">
                  Upload Resume
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files?.[0] || null })}
                    required
                    className="border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <FileText className="w-6 h-6 text-teal-500" />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
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
