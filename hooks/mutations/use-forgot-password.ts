"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "@/types/auth";

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    Error,
    ForgotPasswordPayload
  >({
    mutationFn: authService.forgotPassword,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to send password reset OTP.";

      toast.error("Request failed", {
        description: message,
      });
    },
  });
};