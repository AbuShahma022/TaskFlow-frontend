"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface OrganizationContextValue {
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (organizationId: string | null) => void;
}

const OrganizationContext =
  createContext<OrganizationContextValue | undefined>(undefined);

export function OrganizationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    selectedOrganizationId,
    setSelectedOrganizationId,
  ] = useState<string | null>(null);

  return (
    <OrganizationContext.Provider
      value={{
        selectedOrganizationId,
        setSelectedOrganizationId,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);

  if (!context) {
    throw new Error(
      "useOrganization must be used within OrganizationProvider",
    );
  }

  return context;
}