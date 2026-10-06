"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type {
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    Error,
    RegisterPayload
  >({
    mutationFn: (payload) => authService.register(payload),

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Registration failed. Please try again.";

      toast.error("Registration failed", {
        description: message,
      });
    },
  });
};