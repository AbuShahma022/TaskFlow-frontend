"use client";

import { createContext, useContext } from "react";
import { useMe } from "@/hooks/queries/use-me";
import type { AuthUser } from "@/types/auth";
import { PageLoader } from "@/components/shared/page-loader";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useMe();

  const user = data?.data ?? null;

 if (isLoading) {
  return <PageLoader />;
}

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}