"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  verifyResetOtpSchema,
  type VerifyResetOtpFormValues,
} from "@/lib/validations/auth";

import { useVerifyResetOtp } from "@/hooks/mutations/use-verify-reset-otp";

interface VerifyResetOtpFormProps {
  email: string;
  onSuccess: (otp: string) => void;
}

export function VerifyResetOtpForm({
  email,
  onSuccess,
}: VerifyResetOtpFormProps) {
  const verifyResetOtpMutation = useVerifyResetOtp();

  const form = useForm<VerifyResetOtpFormValues>({
    resolver: zodResolver(verifyResetOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: VerifyResetOtpFormValues) {
    verifyResetOtpMutation.mutate(
      {
        email,
        otp: data.otp,
      },
      {
        onSuccess: () => {
          onSuccess(data.otp);
        },
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
        We sent a 6-digit verification code to{" "}
        <span className="font-medium text-foreground">{email}</span>
      </div>

      <FieldGroup>
        <Controller
          name="otp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-otp">
                Verification Code
              </FieldLabel>

              <Input
                {...field}
                id="reset-otp"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-full"
        disabled={verifyResetOtpMutation.isPending}
      >
        {verifyResetOtpMutation.isPending
          ? "Verifying..."
          : "Verify OTP"}
      </Button>
    </form>
  );
}