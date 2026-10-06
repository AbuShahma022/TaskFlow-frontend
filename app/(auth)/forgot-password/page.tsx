"use client";

import { useState } from "react";
import Link from "next/link";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { VerifyResetOtpForm } from "@/components/auth/verify-reset-otp-form";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

type Step = "email" | "otp" | "password" | "success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  function handleEmailSuccess(email: string) {
    setEmail(email);
    setStep("otp");
  }

  function handleOtpSuccess(otp: string) {
    setOtp(otp);
    setStep("password");
  }

function handleResetSuccess() {
  setStep("success");
}

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">
            {step === "email" && "Forgot Password?"}
            {step === "otp" && "Verify OTP"}
            {step === "password" && "Reset Password"}
            {step === "success" && "Password Reset Successfully"}
          </h1>

          <p className="text-sm text-muted-foreground">
            {step === "email" &&
              "Enter your email address to receive a password reset code."}

            {step === "otp" &&
              "Enter the verification code sent to your email."}

            {step === "password" && "Create a new password for your account."}
          </p>
        </div>

        {step === "email" && (
          <ForgotPasswordForm onSuccess={handleEmailSuccess} />
        )}

        {step === "otp" && (
          <VerifyResetOtpForm email={email} onSuccess={handleOtpSuccess} />
        )}

        {step === "password" && (
          <ResetPasswordForm
            email={email}
            otp={otp}
            onSuccess={handleResetSuccess}
          />
        )}

        {step === "success" && (
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>

            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}