export type SprintStatus =
  | "PLANNED"
  | "ACTIVE"
  | "COMPLETED"
  | "ARCHIVED";

export interface ISprint {
  id: string;
  projectId: string;
  name: string;
  goal: string | null;
  startDate: string;
  endDate: string;
  status: SprintStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateSprint {
  name: string;
  goal?: string;
  startDate: string;
  endDate: string;
}

export interface IUpdateSprint {
  name?: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}

export interface IGetSprintsQuery {
  page?: number;
  limit?: number;
  status?: SprintStatus;
}

export interface ICreateSprintResponse {
  success: boolean;
  message: string;
  data: ISprint;
}

export interface ISprintPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IGetSprintsResponse {
  success: boolean;
  message: string;
  data: {
    data: ISprint[];
    pagination: ISprintPagination;
  };
}