"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/login";
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking access...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (user.role !== "ADMIN") {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted">
            <SearchX className="size-8 text-muted-foreground" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Page not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The page you are looking for does not exist or you
            don't have access to it.
          </p>

          <Button asChild className="mt-6">
            <Link href="/dashboard">
              <ArrowLeft />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}