"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type {
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/types/auth";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation<
    VerifyEmailResponse,
    Error,
    VerifyEmailPayload
  >({
    mutationFn: (payload) => authService.verifyEmail(payload),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to verify email.";

      toast.error("Email verification failed", {
        description: message,
      });
    },
  });
};