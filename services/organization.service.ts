import api from "@/lib/axios";
import type {
  CreateOrganizationInvitationPayload,
  CreateOrganizationInvitationResponse,
  CreateOrganizationPayload,
  CreateOrganizationResponse,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  OrganizationListResponse,
  OrganizationMembersResponse,
  OrganizationResponse,
  UpdateOrganizationPayload,
  UpdateOrganizationResponse
} from "@/types/organization";

export const organizationService = {
  getOrganizations: async (
    params?: GetOrganizationsParams,
  ): Promise<OrganizationListResponse> => {
    const response = await api.get<OrganizationListResponse>(
      "/organizations",
      {
        params,
      },
    );

    return response.data;
  },

  getOrganizationMembers: async (
  organizationId: string,
  params?: GetOrganizationMembersParams,
): Promise<OrganizationMembersResponse> => {
  const response = await api.get(
    `/organizations/${organizationId}/members`,
    {
      params,
    },
  );

  return response.data;
},
getOrganizationById: async (
  organizationId: string,
): Promise<OrganizationResponse> => {
  const response = await api.get<OrganizationResponse>(
    `/organizations/${organizationId}`,
  );

  return response.data;
},

createOrganization: async (
  payload: CreateOrganizationPayload,
): Promise<CreateOrganizationResponse> => {
  const response = await api.post<CreateOrganizationResponse>(
    "/organizations",
    payload,
  );

  return response.data;
},

updateOrganization: async (
  organizationId: string,
  payload: UpdateOrganizationPayload,
): Promise<UpdateOrganizationResponse> => {
  const response = await api.patch<UpdateOrganizationResponse>(
    `/organizations/${organizationId}`,
    payload,
  );

  return response.data;
},

createOrganizationInvitation: async (
  organizationId: string,
  payload: CreateOrganizationInvitationPayload,
): Promise<CreateOrganizationInvitationResponse> => {
  const response =
    await api.post<CreateOrganizationInvitationResponse>(
      `/organizations/${organizationId}/invitations`,
      payload,
    );

  return response.data;
},
};