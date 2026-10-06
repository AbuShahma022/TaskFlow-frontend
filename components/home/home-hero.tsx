import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,theme(colors.primary.DEFAULT)/12%,transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary" />

            Simple project management for modern teams
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
            Manage projects.
            <br />

            <span className="text-primary">
              Move work forward.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            TaskFlow helps teams organize projects, manage tasks,
            collaborate with teammates, and keep every deadline
            under control from one place.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Create your workspace and start managing projects today.
          </p>
        </div>
      </div>
    </section>
  );
}