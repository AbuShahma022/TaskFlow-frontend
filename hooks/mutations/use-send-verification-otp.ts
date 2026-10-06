"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type { SendVerificationOtpResponse } from "@/types/auth";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useSendVerificationOtp = () => {
  const queryClient = useQueryClient();

  return useMutation<SendVerificationOtpResponse, Error, void>({
    mutationFn: () => authService.sendVerificationOtp(),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to send verification OTP.";

      toast.error("OTP sending failed", {
        description: message,
      });
    },
  });
};