import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: async () => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.ME,
      });

      toast.success("Logged out successfully");

      router.replace("/login");
    },

    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
};