"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/types/auth";

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    Error,
    ResetPasswordPayload
  >({
    mutationFn: authService.resetPassword,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to reset password.";

      toast.error("Password reset failed", {
        description: message,
      });
    },
  });
};