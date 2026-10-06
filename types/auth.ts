export type PlatformRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE"  | "BLOCKED";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: PlatformRole;
  status: UserStatus;
  emailVerified: boolean;
  googleId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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

export interface GoogleLoginPayload {
  idToken: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: PlatformRole;
    status: UserStatus;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}