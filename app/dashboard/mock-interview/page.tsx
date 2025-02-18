'use client'
import Image from "next/image";

export default function ResumesPage() {
  return (
    <div className="flex p-6 justify-between items-center">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-[#0A2647]">Welcome to InterviewAI</h1>
        <p className="text-gray-700 mb-8 text-lg">
          Get more job offers by improving your interview skills, master the process, breakdown your
          interviews into manageable parts, and finally conquer your desired job.
        </p>
        <button 
          type="button"
          onClick={() => window.location.href = '/dashboard/mock-interview/new'} 
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-colors"
        >
          Start New Interview
        </button>
      </div>
      <div className="flex-1 flex justify-end">
        <Image
          src="/images/interview-illustration.svg" 
          alt="Interview illustration" 
          className="w-[600px] h-auto"
          width={600}
          height={600}
        />
      </div>
    </div>
  )
} 