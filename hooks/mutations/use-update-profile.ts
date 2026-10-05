"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { UpdateProfileResponse } from "@/types/auth";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, FormData>({
    mutationFn: (formData) => authService.updateProfile(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });
    },
  });
};