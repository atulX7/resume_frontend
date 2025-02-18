"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function NewInterviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    interviewer: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Temporary mock implementation
    router.push(`/dashboard/mock-interview/setup/mock-interview-id`)
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
              value={formData.jobTitle}
              onChange={(e) => setFormData(prev => ({...prev, jobTitle: e.target.value}))}
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-[#0A2647] font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Google"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({...prev, company: e.target.value}))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="resume" className="block text-[#0A2647] font-semibold mb-2">
              Resume
            </label>
            <button
              type="button"
              className="w-full p-3 border border-gray-300 rounded-md text-gray-500 flex items-center justify-center gap-2"
            >
              <span>+</span> Add Resume
            </button>
          </div>
          
          <div>
            <label htmlFor="interviewer" className="block text-[#0A2647] font-semibold mb-2">
              Interviewer Job Title <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="interviewer"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Senior Product Designer"
              value={formData.interviewer}
              onChange={(e) => setFormData(prev => ({...prev, interviewer: e.target.value}))}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-[#0A2647] font-semibold mb-2">
            Job Description <span className="text-gray-500">(optional)</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="As a Product Designer, you will play a pivotal role in crafting intuitive and visually captivating digital products..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
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
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  )
} 