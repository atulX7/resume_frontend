"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useUser } from '@/lib/user'
import Link from 'next/link'

export default function NewInterviewPage() {
  const router = useRouter()
  const { user } = useUser()
  const [formData, setFormData] = useState<{
    job_title: string;
    job_description: string;
    resume_file: File | null;
  }>({
    job_title: '',
    job_description: '',
    resume_file: null,
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setFormData(prev => ({...prev, resume_file: file}));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      alert('Please sign in to continue');
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the Terms and Conditions and Privacy Policy');
      return;
    }

    if (!formData.job_title || !formData.job_description) {
      alert('Please fill in all required fields');
      return;
    }
    let base64Resume = null;
    if (resumeFile) {
      const buffer = await resumeFile.arrayBuffer();
      base64Resume = {
        name: resumeFile.name,
        type: resumeFile.type,
        data: Buffer.from(buffer).toString('base64')
      };
    }

    localStorage.setItem('interview-form-data', JSON.stringify({
      job_title: formData.job_title,
      job_description: formData.job_description,
      resume_file: base64Resume
    }));

    router.push('/dashboard/mock-mate/session/setup');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#0A2647] mb-3">Prepare Your Interview</h1>
          <p className="text-gray-600 mb-8 text-lg">Fill in the details below to start your mock interview session</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label htmlFor="jobTitle" className="block text-[#0A2647] text-lg font-semibold mb-3">
                What position are you applying for?
              </label>
              <input
                type="text"
                id="jobTitle"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="e.g., Senior Product Designer"
                value={formData.job_title}
                onChange={(e) => setFormData(prev => ({...prev, job_title: e.target.value}))}
              />
            </div>

            {/* Resume Upload Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label htmlFor="resume" className="block text-[#0A2647] text-lg font-semibold mb-3">
                Upload your resume
              </label>
              <label 
                className={`w-full p-6 border-2 border-dashed border-gray-300 rounded-lg
                  flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-500
                  transition-all duration-200 ${resumeFile ? 'bg-blue-50 border-blue-500' : ''}`}
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <input
                  type="file"
                  id="resume"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <div className="text-center">
                  <span className="text-blue-600 font-medium">Click to upload</span>
                  <span className="text-gray-500"> or drag and drop</span>
                  <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                </div>
                {resumeFile && (
                  <div className="mt-2 text-sm text-blue-600 font-medium">{resumeFile.name}</div>
                )}
              </label>
            </div>

            {/* Job Description Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label htmlFor="description" className="block text-[#0A2647] text-lg font-semibold mb-3">
                Paste the job description
              </label>
              <textarea
                id="description"
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Copy and paste the job description here..."
                value={formData.job_description}
                onChange={(e) => setFormData(prev => ({...prev, job_description: e.target.value}))}
              />
            </div>

            {/* Terms and Privacy Policy Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
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
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/dashboard/mock-mate'}
                className="px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                ← Back
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                {isSubmitting ? 'Processing...' : 'Continue →'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}