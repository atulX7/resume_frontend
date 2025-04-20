import { Mail, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'

export function Footer() {
  const { theme, setTheme } = useTheme()
  const emailLink = "mailto:support@resuwin.com?subject=Contact%20ResuWin"
  const privacyPolicyLink = "/privacy-policy"

  const handleContact = () => {
    window.location.href = emailLink
  }

  const handlePrivacyPolicy = () => {
    window.location.href = privacyPolicyLink
  }

  const currentYear = new Date().getFullYear()
  const mainContent = `© ${currentYear} ResuWin. Create professional resumes and get personalized feedback.`

  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground">
          {mainContent}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleContact}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrivacyPolicy}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
}