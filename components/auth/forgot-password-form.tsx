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
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validations/auth";

import { useForgotPassword } from "@/hooks/mutations/use-forgot-password";

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export function ForgotPasswordForm({
  onSuccess,
}: ForgotPasswordFormProps) {
  const forgotPasswordMutation = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        onSuccess(data.email);
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-password-email">
                Email
              </FieldLabel>

              <Input
                {...field}
                id="forgot-password-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
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
        disabled={forgotPasswordMutation.isPending}
      >
        {forgotPasswordMutation.isPending
          ? "Sending OTP..."
          : "Send Reset OTP"}
      </Button>
    </form>
  );
}