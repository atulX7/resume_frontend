import { Suspense } from "react"
import { Card } from "@/components/ui/card"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <Card className="animate-pulse bg-muted/50">
              <div className="h-[600px]"></div>
            </Card>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  )
}