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
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/validations/auth";

import { useResetPassword } from "@/hooks/mutations/use-reset-password";

interface ResetPasswordFormProps {
  email: string;
  otp: string;
  onSuccess: () => void;
}

export function ResetPasswordForm({
  email,
  otp,
  onSuccess,
}: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordFormValues) {
    resetPasswordMutation.mutate(
      {
        email,
        otp,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-new-password">
                New Password
              </FieldLabel>

              <Input
                {...field}
                id="reset-new-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reset-confirm-password">
                Confirm Password
              </FieldLabel>

              <Input
                {...field}
                id="reset-confirm-password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
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
        disabled={resetPasswordMutation.isPending}
      >
        {resetPasswordMutation.isPending
          ? "Resetting Password..."
          : "Reset Password"}
      </Button>
    </form>
  );
}