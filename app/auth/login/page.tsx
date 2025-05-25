'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { Wand2, FileText, MessageSquare } from 'lucide-react'
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      if (session.user.role === 'ADMIN') {
        router.push('/admin/dashboard/mock-mate')
      } else {
        router.push('/dashboard/mock-mate')
      }
    }
  }, [session, router])

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard/mock-mate' })
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="p-8 bg-card rounded-xl shadow-lg w-full max-w-md border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">{siteConfig.name}</h1>
            <p className="text-muted-foreground">{siteConfig.description}</p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 mb-8"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/20">
              <FileText className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Resume Builder</h3>
              <p className="text-sm text-muted-foreground">Create professional resumes easily</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/20">
              <Wand2 className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">AI Enhancement</h3>
              <p className="text-sm text-muted-foreground">Improve with AI suggestions</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/20 md:col-span-2">
              <MessageSquare className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-semibold mb-1">Interview Practice</h3>
              <p className="text-sm text-muted-foreground">Prepare with AI-powered mock interviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}