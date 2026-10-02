import api from "@/lib/axios";
import type { LoginPayload, LoginResponse, MeResponse } from "@/types/auth";

export const authService = {
  getMe: async (): Promise<MeResponse> => {
    const response = await api.get<MeResponse>("/auth/me");

    return response.data;
  },

    login: async (
    payload: LoginPayload,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      payload,
    );

    return response.data;
  },

};