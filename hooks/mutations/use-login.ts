import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { LoginPayload } from "@/types/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) =>
      authService.login(payload),

onSuccess: async (data) => {
  await queryClient.invalidateQueries({
    queryKey: QUERY_KEYS.AUTH.ME,
  });

  toast.success("Login successful");

  if (data.data.user.role === "ADMIN") {
    router.replace("/admin");
  } else {
    router.replace("/dashboard");
  }
},

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Login failed. Please try again.";

      toast.error("Login failed", {
        description: message,
      });
    },
  });
};