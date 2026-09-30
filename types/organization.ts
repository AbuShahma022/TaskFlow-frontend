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