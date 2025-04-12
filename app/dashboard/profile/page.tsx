'use client'

import { signOut, useSession } from 'next-auth/react'

export default function SettingsPage() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Profile Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400 w-32 font-medium">Name</span>
                <span className="text-gray-900 dark:text-gray-200">{session?.user?.name || 'N/A'}</span>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400 w-32 font-medium">Email</span>
                <span className="text-gray-900 dark:text-gray-200">{session?.user?.email || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 
                dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 group"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}