"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const legalLinks = [
  { name: "Privacy Policy", href: "/legal/privacy-policy" },
  { name: "Terms of Service", href: "/legal/terms" },
  { name: "Contact Us", href: "/legal/contact" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
];

export function Footer() {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <Link
                href="/"
                className="font-medium underline underline-offset-4"
              >
                ResuWin
              </Link>
              . The AI-powered career enhancement platform.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <nav className="flex gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <nav className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.footer>
      <div className="w-full text-center py-2 text-xs text-muted-foreground bg-background/80">
        © {new Date().getFullYear()} ResuWin. All rights reserved.
      </div>
    </>
  );
}