export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface IGetProjectsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: ProjectStatus;
}

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  _count: {
    members: number;
    tasks: number;
    sprints: number;
  };
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data: {
    data: Project[];
    pagination: ProjectPagination;
  };
}