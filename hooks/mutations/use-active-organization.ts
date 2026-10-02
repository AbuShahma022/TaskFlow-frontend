"use client";

import { useOrganization } from "@/providers/organization-provider";

export function useActiveOrganization() {
  const { selectedOrganizationId } = useOrganization();
 
  return {
    organizationId: selectedOrganizationId,
    hasOrganization: Boolean(selectedOrganizationId),
  };
}