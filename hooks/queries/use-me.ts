import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useMe = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authService.getMe,
    retry: false,
  });
};