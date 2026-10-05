"use client";

import { useMutation } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import type { CreateOrganizationInvitationPayload } from "@/types/organization";

export const useCreateOrganizationInvitation = () => {
  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: CreateOrganizationInvitationPayload;
    }) =>
      organizationService.createOrganizationInvitation(
        organizationId,
        payload,
      ),
  });
};