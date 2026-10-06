export type AdminUserStatus = "ACTIVE" | "BLOCKED";
export type AdminPlatformRole = "USER" | "ADMIN";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: AdminPlatformRole;
  status: AdminUserStatus;
  emailVerified: boolean;
  googleId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface AdminUserPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAdminUsersResponse {
  success: boolean;
  message: string;
  meta: AdminUserPagination;
  data: AdminUser[];
}

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: AdminPlatformRole;
  status?: AdminUserStatus;
}

export interface UpdateAdminUserStatusPayload {
  status: AdminUserStatus;
}

export interface UpdateAdminUserStatusResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}