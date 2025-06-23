import { FileText, Award, Users } from 'lucide-react';

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-extrabold text-blue-800 dark:text-blue-300 mb-4">Our Services</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Boost your career with our suite of AI-powered tools designed to help you stand out and succeed.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {/* Resume Analysis */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-blue-100 dark:border-gray-700">
                    <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                    <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Resume Analysis</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                        Instantly analyze your resume for ATS compatibility, keyword optimization, and formatting best practices.
                    </p>
                </div>
                {/* Resume Tailoring */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-blue-100 dark:border-gray-700">
                    <Award className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                    <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Resume Tailoring</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                        Personalize your resume for each job application. Highlight your most relevant skills and experiences.
                    </p>
                </div>
                {/* Mock Interview */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-blue-100 dark:border-gray-700">
                    <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                    <h2 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">Mock Interview</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                        Practice with realistic, AI-powered mock interviews and get actionable feedback to improve your performance.
                    </p>
                </div>
            </div>
        </div>
    );
} 