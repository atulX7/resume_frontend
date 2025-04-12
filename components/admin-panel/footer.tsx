
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Footer() {
  const [isLoading, setIsLoading] = useState(false)
  const emailLink = "mailto:support@resuwin.com?subject=Contact%20ResuWin"

  const handleContact = () => {
    setIsLoading(true)
    window.location.href = emailLink
    // Reset loading state after a short delay
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          © {new Date().getFullYear()} ResuWin. Create professional resumes and get personalized feedback.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleContact}
          disabled={isLoading}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Mail className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
          {isLoading ? 'Opening...' : 'Contact Us'}
        </Button>
      </div>
    </div>
  );
}
