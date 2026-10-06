"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
  const router = useRouter();

  return (
    <main className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-5" />
          </div>

          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage TaskFlow platform users and access.
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            User Management
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            View users, inspect user details, and manage account
            status.
          </p>

          <Button
            className="mt-4"
            onClick={() => router.push("/admin/users")}
          >
            Manage Users
            <ArrowRight />
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}