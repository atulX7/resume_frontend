'use client'

import { signOut, useSession } from 'next-auth/react'

export default function SettingsPage() {
  const { data: session } = useSession()

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Profile Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Name:</span>
              <span className="font-medium">{session?.user?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Email:</span>
              <span className="font-medium">{session?.user?.email || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
} 