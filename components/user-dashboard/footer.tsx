import { Mail, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import Link from "next/link"

export function Footer() {
  const { theme, setTheme } = useTheme()
  const currentYear = new Date().getFullYear()
  const mainContent = `© ${currentYear} ResuWin. Create professional resumes and get personalized feedback.`

  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:px-8 flex flex-col sm:flex-row h-auto sm:h-14 py-4 sm:py-0 items-center justify-between">
        <p className="text-xs leading-loose text-muted-foreground mb-4 sm:mb-0 text-center sm:text-left">
          {mainContent}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8"
          >
            <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="/legal/contact" target="_blank" rel="noreferrer">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground px-2 sm:px-3"
            >
              <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              Contact
            </Button>
          </Link>

          <Link href="/legal/privacy-policy" target="_blank" rel="noreferrer">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs sm:text-sm flex items-center text-muted-foreground hover:text-foreground px-2 sm:px-3"
            >
              Privacy
            </Button>
          </Link>

          <Link href="/legal/terms" target="_blank" rel="noreferrer">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs sm:text-sm flex items-center text-muted-foreground hover:text-foreground px-2 sm:px-3"
            >
              Terms
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}