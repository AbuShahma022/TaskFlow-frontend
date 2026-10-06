"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";

export function HomeNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            T
          </div>

          <span className="text-lg font-bold tracking-tight">
            TaskFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="/#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="/#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>

          <a
            href="/#pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </a>
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />

          <Button variant="ghost" asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link href="/register">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}