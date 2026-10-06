import api from "@/lib/axios";

import type {
  GetAdminUsersParams,
  GetAdminUsersResponse,
  UpdateAdminUserStatusPayload,
  UpdateAdminUserStatusResponse,
} from "@/types/admin-user";

export const adminUserService = {
  getUsers: async (
    params?: GetAdminUsersParams,
  ): Promise<GetAdminUsersResponse> => {
    const response = await api.get<GetAdminUsersResponse>("/users", {
      params,
    });

    return response.data;
  },

  updateUserStatus: async (
  userId: string,
  payload: UpdateAdminUserStatusPayload,
): Promise<UpdateAdminUserStatusResponse> => {
  const response = await api.patch<UpdateAdminUserStatusResponse>(
    `/users/${userId}/status`,
    payload,
  );

  return response.data;
},
};