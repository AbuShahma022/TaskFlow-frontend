import { useQuery } from "@tanstack/react-query";

import { adminUserService } from "@/services/admin-user.service";
import type { GetAdminUsersParams } from "@/types/admin-user";

export const useAdminUsers = (params?: GetAdminUsersParams) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => adminUserService.getUsers(params),
  });
};