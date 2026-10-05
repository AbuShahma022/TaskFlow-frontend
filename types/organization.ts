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