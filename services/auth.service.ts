import api from "@/lib/axios";
import type { AuthUser } from "@/store/features/auth/authSlice";
import { API_ENDPOINTS } from "@/constants/api";


interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

export const authService = {
  getMe: async (): Promise<AuthUser> => {
    const response = await api.get<AuthResponse>(
      API_ENDPOINTS.AUTH.ME
    );

    return response.data.data.user;
  },

  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};