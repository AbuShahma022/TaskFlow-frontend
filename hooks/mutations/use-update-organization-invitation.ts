"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import type {
  UpdateOrganizationInvitationPayload,
  UpdateOrganizationInvitationResponse,
} from "@/types/organization";

export const useUpdateOrganizationInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateOrganizationInvitationResponse,
    Error,
    {
      invitationId: string;
      payload: UpdateOrganizationInvitationPayload;
    }
  >({
    mutationFn: ({ invitationId, payload }) =>
      organizationService.updateOrganizationInvitation(
        invitationId,
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-organization-invitations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["organization-invitations"],
      });

      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
  });
};