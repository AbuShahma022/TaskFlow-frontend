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

export interface ICreateProject {
  name: string;
  description?: string;
}

export interface IProjectMember {
  id: string;
  projectId: string;
  userId: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface IProjectSprint {
  id: string;
  projectId: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IProjectDetails {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  members: IProjectMember[];
  sprints: IProjectSprint[];
  _count: {
    members: number;
    tasks: number;
    sprints: number;
  };
}

export interface IProjectResponse {
  success: boolean;
  message: string;
  data: IProjectDetails;
}

export interface IUpdateProject {
   name?: string;
  description?: string;
}

export type IEditableProject = Pick<
  IProjectDetails,
  "id" | "name" | "description"
>;

export interface IAddProjectMember {
  userId: string;
}

export interface IProjectMemberResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    projectId: string;
    userId: string;
    joinedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IProjectMember {
  id: string;
  projectId: string;
  userId: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface IGetProjectMembersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetProjectMembersResponse {
  success: boolean;
  message: string;
  data: {
    data: IProjectMember[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}