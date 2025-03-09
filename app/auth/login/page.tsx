'use client'

import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { Wand2, FileText, MessageSquare } from 'lucide-react'

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
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
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