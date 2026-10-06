"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useOrganizations } from "@/hooks/queries/use-organizations";
import { OrganizationMembership } from "@/types/organization";
import { useAuth } from "@/providers/auth-provider";

interface OrganizationContextValue {
  organizations: OrganizationMembership[];
  isLoading: boolean;
  isError: boolean;
  selectedOrganizationId: string | null;
  setSelectedOrganizationId: (organizationId: string | null) => void;
  selectedMembership?: OrganizationMembership;
}

const OrganizationContext =
  createContext<OrganizationContextValue | undefined>(undefined);

export function OrganizationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();
  const { data, isLoading, isError } = useOrganizations();

  const [
    selectedOrganizationId,
    setSelectedOrganizationId,
  ] = useState<string | null>(null);

  const organizations = data?.data ?? [];
  const selectedMembership = organizations.find(
  (membership) =>
    membership.organization.id === selectedOrganizationId,
);
  useEffect(() => {
  if (!user) {
    setSelectedOrganizationId(null);
  }
}, [user]);
 
useEffect(() => {
  if (
    user &&
    !selectedOrganizationId &&
    organizations.length > 0
  ) {
    setSelectedOrganizationId(
      organizations[0].organization.id,
    );
  }
}, [
  user,
  organizations,
  selectedOrganizationId,
]);

  return (
    <OrganizationContext.Provider
  value={{
    organizations,
    isLoading,
    isError,
    selectedOrganizationId,
    setSelectedOrganizationId,
    selectedMembership,
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