"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUser } from '@/lib/user'

export default function NewInterviewPage() {
  const router = useRouter()
  const { user } = useUser()
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    resume_file: null,
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert('Please sign in to continue');
      return;
    }

    if (!formData.job_title || !formData.job_description) {
      alert('Please fill in all required fields');
      return;
    }

    // Store form data in localStorage
    localStorage.setItem('interview-form-data', JSON.stringify({
      ...formData,
      resume_file: resumeFile
    }));

    // Navigate to setup page (without ID)
    router.push('/dashboard/mock-interview/setup');
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#0A2647] mb-2">Choose a Job</h1>
      <p className="text-gray-600 mb-8">Choose the job position you wish to get interview-ready for!</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobTitle" className="block text-[#0A2647] font-semibold mb-2">
              Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Product Designer"
              value={formData.job_title}
              onChange={(e) => setFormData(prev => ({...prev, job_title: e.target.value}))}
            />
          </div>
        
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="resume" className="block text-[#0A2647] font-semibold mb-2">
              Resume
            </label>
            <label 
              className={`w-full p-3 border border-gray-300 rounded-md text-gray-500 
                flex items-center justify-center gap-2 cursor-pointer
                ${resumeFile ? 'bg-green-50' : ''}`}
            >
              <input
                type="file"
                id="resume"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <span>+</span>
              {resumeFile ? resumeFile.name : 'Add Resume'}
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-[#0A2647] font-semibold mb-2">
            Job Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="As a Product Designer, you will play a pivotal role in crafting intuitive and visually captivating digital products..."
            value={formData.job_description}
            onChange={(e) => setFormData(prev => ({...prev, job_description: e.target.value}))}
          />
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/dashboard/mock-interview'}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  )
} 