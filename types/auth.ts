export type UserRole = "USER" | "MANAGER" | "MEMBER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" ;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}