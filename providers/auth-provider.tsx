"use client";

import { useEffect } from "react";
import { authService } from "@/services/auth.service";
import {
  clearUser,
  setAuthLoading,
  setUser,
} from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch(setAuthLoading(true));

        const user = await authService.getMe();

        dispatch(setUser(user));
      } catch {
        dispatch(clearUser());
      }
    };

    initializeAuth();
  }, [dispatch]);

  return children;
}