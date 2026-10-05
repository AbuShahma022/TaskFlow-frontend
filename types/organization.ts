export type OrganizationRole = "MANAGER" | "MEMBER";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembership {
  id: string;
  role: OrganizationRole;
  joinedAt: string;
  organization: Organization;
}

export interface OrganizationListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrganizationListResponse {
  success: boolean;
  message: string;
  meta: OrganizationListMeta;
  data: OrganizationMembership[];
}

export interface GetOrganizationsParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Organization members
export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
    emailVerified: boolean;
  };
}

export interface OrganizationMemberMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrganizationMembersResponse {
  success: boolean;
  message: string;
  data: {
    meta: OrganizationMemberMeta;
    data: OrganizationMember[];
  };
}

export interface GetOrganizationMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: OrganizationRole;
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface CreateOrganizationPayload {
  name: string;
  slug: string;
  description?: string;
}

export interface CreateOrganizationResponse {
  success: boolean;
  message: string;
  data: {
    organization: Organization & {
      deletedAt: string | null;
    };
    member: OrganizationMember;
  };
}

export interface UpdateOrganizationPayload {
  name?: string;
  description?: string;
}

export interface UpdateOrganizationResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface CreateOrganizationInvitationPayload {
  email: string;
}

export interface OrganizationInvitation {
  id: string;
  status:
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "CANCELLED";
  createdAt: string;
  invitedUser: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface CreateOrganizationInvitationResponse {
  success: boolean;
  message: string;
  data: OrganizationInvitation;
}


export type OrganizationInvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export interface OrganizationInvitationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrganizationInvitationUser {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export interface OrganizationInvitationInvitedBy {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface OrganizationManagerInvitation {
  id: string;
  status: OrganizationInvitationStatus;
  createdAt: string;
  respondedAt: string | null;
  invitedUser: OrganizationInvitationUser;
  invitedBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface OrganizationManagerInvitationsResponse {
  success: boolean;
  message: string;
  meta: OrganizationInvitationMeta;
  data: OrganizationManagerInvitation[];
}

export interface MyOrganizationInvitation {
  id: string;
  status: OrganizationInvitationStatus;
  createdAt: string;
  respondedAt: string | null;
  organization: {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
  };
  invitedBy: OrganizationInvitationInvitedBy;
}

export interface MyOrganizationInvitationsResponse {
  success: boolean;
  message: string;
  meta: OrganizationInvitationMeta;
  data: MyOrganizationInvitation[];
}

export interface GetOrganizationInvitationsParams {
  page?: number;
  limit?: number;
  status?: OrganizationInvitationStatus;
}

export type UpdateOrganizationInvitationStatus =
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export interface UpdateOrganizationInvitationPayload {
  status: UpdateOrganizationInvitationStatus;
}

export interface AcceptedOrganizationInvitationData {
  invitation: {
    id: string;
    organizationId: string;
    invitedUserId: string;
    invitedById: string;
    status: "ACCEPTED";
    createdAt: string;
    respondedAt: string;
  };
  member: {
    id: string;
    organizationId: string;
    userId: string;
    role: OrganizationRole;
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RejectedOrganizationInvitationData {
  id: string;
  organizationId: string;
  invitedUserId: string;
  invitedById: string;
  status: "REJECTED";
  createdAt: string;
  respondedAt: string;
}

export interface UpdateOrganizationInvitationResponse {
  success: boolean;
  message: string;
  data:
    | AcceptedOrganizationInvitationData
    | RejectedOrganizationInvitationData;
}