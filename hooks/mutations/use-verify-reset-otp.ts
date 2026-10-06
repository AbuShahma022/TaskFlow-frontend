"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type {
  VerifyResetOtpPayload,
  VerifyResetOtpResponse,
} from "@/types/auth";

export const useVerifyResetOtp = () => {
  return useMutation<
    VerifyResetOtpResponse,
    Error,
    VerifyResetOtpPayload
  >({
    mutationFn: authService.verifyResetOtp,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Invalid or expired OTP.";

      toast.error("OTP verification failed", {
        description: message,
      });
    },
  });
};