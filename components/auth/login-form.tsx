"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useLogin } from "@/hooks/mutations/use-login";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@/hooks/mutations/use-google-login";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validations/auth";
import { Separator } from "../ui/separator";
import { GoogleIcon } from "../icons/google-icon";


const demoAccounts = [
  {
    role: "Admin",
    email: process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_ADMIN_PASSWORD ?? "",
  },
  {
    role: "Manager",
    email: process.env.NEXT_PUBLIC_DEMO_MANAGER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_MANAGER_PASSWORD ?? "",
  },
  {
    role: "Member",
    email: process.env.NEXT_PUBLIC_DEMO_MEMBER_EMAIL ?? "",
    password: process.env.NEXT_PUBLIC_DEMO_MEMBER_PASSWORD ?? "",
  },
];


export function LoginForm() {
 const loginMutation = useLogin();
 const googleLoginMutation = useGoogleLogin();
 const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

function onSubmit(data: LoginFormValues) {
  loginMutation.mutate(data);
}
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>

              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>

                <a
                  href="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs whitespace-nowrap text-muted-foreground">
          Or continue with
        </span>

        <Separator className="flex-1" />
      </div>
      <div className="relative">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const idToken = credentialResponse.credential

            if (!idToken) {
              return
            }

            googleLoginMutation.mutate({
              idToken,
            })
          }}
          onError={() => {
            console.error("Google login failed")
          }}
          useOneTap={false}
          width="100%"
        />

        {googleLoginMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/70">
            <span className="text-sm text-muted-foreground">
              Signing in with Google...
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
  <p className="text-sm font-medium">
    Quick Login
  </p>

  <div className="grid grid-cols-3 gap-2">
    {demoAccounts.map((account) => (
      <Button
        key={account.role}
        type="button"
        variant="outline"
        disabled={
          loginMutation.isPending ||
          !account.email ||
          !account.password
        }
        onClick={() => {
          form.setValue("email", account.email);
          form.setValue("password", account.password);

          loginMutation.mutate({
            email: account.email,
            password: account.password,
          });
        }}
      >
        {account.role}
      </Button>
    ))}
  </div>
</div>
    </form>
  )
}