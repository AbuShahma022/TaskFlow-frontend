"use client";

import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { makeQueryClient } from "@/lib/query-client";
import StoreProvider from "@/store/provider";
import { AuthProvider } from "@/providers/auth-provider";
import { OrganizationProvider } from "@/providers/organization-provider";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <GoogleOAuthProvider
  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
>

    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
           <OrganizationProvider>
          <AuthProvider>
          {children}
        </AuthProvider>
         </OrganizationProvider>
          <Toaster richColors position="top-right" />
        </QueryClientProvider>
      </StoreProvider>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}