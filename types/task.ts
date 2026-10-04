export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "URGENT";

export interface ITask {
  id: string;
  projectId: string;
  sprintId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignedToId: string | null;
  dueDate: string | null;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateTask {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
}

export interface IUpdateTask {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  assignedToId?: string | null;
  dueDate?: string | null;
}

export interface IGetTasksQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  sprintId?: string;
  assignedToId?: string;
}

export interface ITaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IGetTasksResponse {
  success: boolean;
  message: string;
  data: {
    data: ITask[];
    pagination: ITaskPagination;
  };
}