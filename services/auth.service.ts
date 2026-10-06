import api from "@/lib/axios";
import type { ChangePasswordPayload, ChangePasswordResponse, ForgotPasswordPayload, ForgotPasswordResponse, GoogleLoginPayload, LoginPayload, LoginResponse, MeResponse, RegisterPayload, RegisterResponse, ResetPasswordPayload, ResetPasswordResponse, SendVerificationOtpResponse, UpdateProfileResponse, VerifyEmailPayload, VerifyEmailResponse, VerifyResetOtpPayload, VerifyResetOtpResponse } from "@/types/auth";

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

  googleLogin: async (
  payload: GoogleLoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/google",
    payload,
  );

  return response.data;
},

logout: async (): Promise<void> => {
  await api.post("/auth/logout");
},

updateProfile: async (
  formData: FormData,
): Promise<UpdateProfileResponse> => {
  const response = await api.patch<UpdateProfileResponse>(
    "/users/me",
    formData,
  );

  return response.data;
},

changePassword: async (
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const response = await api.patch<ChangePasswordResponse>(
    "/users/change-password",
    payload,
  );

  return response.data;
},

register: async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    payload,
  );

  return response.data;
},

sendVerificationOtp: async (): Promise<SendVerificationOtpResponse> => {
  const response = await api.post<SendVerificationOtpResponse>(
    "/auth/send-verification-otp",
  );

  return response.data;
},

verifyEmail: async (
  payload: VerifyEmailPayload,
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(
    "/auth/verify-email",
    payload,
  );

  return response.data;
},

forgotPassword: async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );

  return response.data;
},

verifyResetOtp: async (
  payload: VerifyResetOtpPayload,
): Promise<VerifyResetOtpResponse> => {
  const response = await api.post<VerifyResetOtpResponse>(
    "/auth/verify-reset-otp",
    payload,
  );

  return response.data;
},

resetPassword: async (
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload,
  );

  return response.data;
},

};
