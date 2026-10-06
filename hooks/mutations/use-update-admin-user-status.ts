"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminUserService } from "@/services/admin-user.service";
import type {
  UpdateAdminUserStatusPayload,
  UpdateAdminUserStatusResponse,
} from "@/types/admin-user";

export const useUpdateAdminUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateAdminUserStatusResponse,
    Error,
    { userId: string; payload: UpdateAdminUserStatusPayload }
  >({
    mutationFn: ({ userId, payload }) =>
      adminUserService.updateUserStatus(userId, payload),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Failed to update user status.";

      toast.error("Status update failed", {
        description: message,
      });
    },
  });
};