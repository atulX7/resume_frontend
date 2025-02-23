'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  const [tailoredResume, setTailoredResume] = useState<{
    review_suggestions?: string;    
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTailoredResume(null);
    
    if (!formData.resumeFile) {
      console.error('No resume file selected');
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
        // Encode only the sections data
        const encodedData = btoa(JSON.stringify(response.data.sections));
        router.push(`/dashboard/tailor-resume/details?data=${encodedData}`);
      } else {
        console.error('Failed to tailor resume:', response.error);
      }
    } catch (error) {
      console.error('Error tailoring resume:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Make Your Resume Perfect</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
            Job Title
          </label>
          <Input
            id="jobTitle"
            type="text"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
            Job Description
          </label>
          <Textarea
            id="jobDescription"
            value={formData.jobDescription}
            onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
            required
            rows={5}
          />
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium mb-1">
            Required Skills
          </label>
          <Input
            id="skills"
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="Enter skills separated by commas"
            required
          />
        </div>

        <div>
          <label htmlFor="resumeFile" className="block text-sm font-medium mb-1">
            Upload Resume
          </label>
          <Input
            id="resumeFile"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files?.[0] || null })}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>

      {tailoredResume && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Tailored Resume</h2>
          <div className="bg-gray-50 p-6 rounded-lg border">
            <pre className="whitespace-pre-wrap">{tailoredResume.review_suggestions}</pre>  
          </div>
        </div>
      )}
    </div>
  );
}
