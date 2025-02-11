'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard')
      }
    }
  }, [session, router])

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-card rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <Button 
          onClick={handleGoogleLogin}
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
        >
          Continue with Google
        </Button>
      </div>
    </div>
  )
} 