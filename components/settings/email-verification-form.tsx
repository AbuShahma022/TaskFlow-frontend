"use client";

import { useState } from "react";

import { useSendVerificationOtp } from "@/hooks/mutations/use-send-verification-otp";
import { useVerifyEmail } from "@/hooks/mutations/use-verify-email";
import { useMe } from "@/hooks/queries/use-me";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export function EmailVerificationForm() {
  const { data } = useMe();

  const sendOtpMutation = useSendVerificationOtp();
  const verifyEmailMutation = useVerifyEmail();

  const [otp, setOtp] = useState("");

  const user = data?.data;

  if (user?.emailVerified) {
    return (
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium">Email verified</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {user.email}
        </p>
      </div>
    );
  }

  const handleSendOtp = () => {
    sendOtpMutation.mutate();
  };

  const handleVerify = () => {
    if (!otp.trim()) {
      return;
    }

    verifyEmailMutation.mutate({
      otp: otp.trim(),
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium">Email verification required</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Verify your email address to secure your TaskFlow account.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="verification-email">
                Email
              </FieldLabel>

              <Input
                id="verification-email"
                value={user?.email ?? ""}
                disabled
              />
            </Field>
          </FieldGroup>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleSendOtp}
          disabled={sendOtpMutation.isPending}
        >
          {sendOtpMutation.isPending
            ? "Sending..."
            : "Send OTP"}
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="verification-otp">
                Verification OTP
              </FieldLabel>

              <Input
                id="verification-otp"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="Enter 6-digit OTP"
                inputMode="numeric"
                maxLength={6}
              />

              {!otp.trim() && verifyEmailMutation.isError && (
                <FieldError>
                  Please enter the verification OTP.
                </FieldError>
              )}
            </Field>
          </FieldGroup>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          disabled={
            verifyEmailMutation.isPending ||
            !otp.trim()
          }
        >
          {verifyEmailMutation.isPending
            ? "Verifying..."
            : "Verify Email"}
        </Button>
      </div>
    </div>
  );
}