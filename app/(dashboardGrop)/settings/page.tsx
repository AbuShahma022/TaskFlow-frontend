"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { ChangePasswordForm } from "@/components/settings/change-password-form";
import { MailCheck } from "lucide-react";
import { EmailVerificationForm } from "@/components/settings/email-verification-form";

export default function SettingsPage() {
  return (
    <main className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <Card className="max-w-2xl">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <MailCheck className="size-5" />
      Email Verification
    </CardTitle>
  </CardHeader>

  <CardContent>
    <EmailVerificationForm />
  </CardContent>
</Card>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="size-5" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </main>
  );
}