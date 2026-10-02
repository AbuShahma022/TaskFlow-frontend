export type PlatformRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE"  | "BLOCKED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: PlatformRole;
  status: UserStatus;
  emailVerified: boolean;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
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