import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          © {new Date().getFullYear()} Boost Resume. Create professional resumes and get personalized feedback.{" "}
          <Link
            href="/privacy"
            className="font-medium underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          {" "}·{" "}
          <Link
            href="/terms"
            className="font-medium underline underline-offset-4"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}
