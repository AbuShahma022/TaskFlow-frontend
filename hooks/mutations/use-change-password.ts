"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type {
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/types/auth";

export const useChangePassword = () => {
  return useMutation<
    ChangePasswordResponse,
    Error,
    ChangePasswordPayload
  >({
    mutationFn: (payload) => authService.changePassword(payload),

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to change password.";

      toast.error("Password change failed", {
        description: message,
      });
    },
  });
};