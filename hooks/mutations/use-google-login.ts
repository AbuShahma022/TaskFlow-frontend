import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { GoogleLoginPayload } from "@/types/auth";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) =>
      authService.googleLogin(payload),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      })

      toast.success("Google login successful")

      if (data.data.user.role === "ADMIN") {
        router.replace("/admin")
      } else {
        router.replace("/dashboard")
      }
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Google login failed. Please try again."

      toast.error("Google login failed", {
        description: message,
      })
    },
  })
};