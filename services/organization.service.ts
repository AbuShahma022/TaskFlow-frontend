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
  UpdateOrganizationResponse,
  GetOrganizationInvitationsParams,
MyOrganizationInvitationsResponse,
OrganizationManagerInvitationsResponse,
UpdateOrganizationInvitationPayload,
UpdateOrganizationInvitationResponse,
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

getOrganizationInvitations: async (
  organizationId: string,
  params?: GetOrganizationInvitationsParams,
): Promise<OrganizationManagerInvitationsResponse> => {
  const response =
    await api.get<OrganizationManagerInvitationsResponse>(
      `/organizations/${organizationId}/invitations`,
      {
        params,
      },
    );

  return response.data;
},

getMyOrganizationInvitations: async (
  params?: GetOrganizationInvitationsParams,
): Promise<MyOrganizationInvitationsResponse> => {
  const response =
    await api.get<MyOrganizationInvitationsResponse>(
      "/organizations/invitations/me",
      {
        params,
      },
    );

  return response.data;
},

updateOrganizationInvitation: async (
  invitationId: string,
  payload: UpdateOrganizationInvitationPayload
): Promise<UpdateOrganizationInvitationResponse> => {
  const response = await api.patch<UpdateOrganizationInvitationResponse>(
    `/organizations/invitations/${invitationId}`,
    payload
  );

  return response.data;
},
};