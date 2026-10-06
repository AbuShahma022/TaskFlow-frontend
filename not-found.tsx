import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
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