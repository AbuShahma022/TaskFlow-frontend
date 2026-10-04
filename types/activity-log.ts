export type ActivityAction =
  | "PROJECT_CREATED"
  | "PROJECT_UPDATED"
  | "PROJECT_ARCHIVED"
  | "MEMBER_INVITED"
  | "MEMBER_ADDED"
  | "MEMBER_REMOVED"
  | "INVITATION_REJECTED"
  | "INVITATION_CANCELLED"
  | "TEAM_CREATED"
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_ASSIGNED"
  | "TASK_STATUS_CHANGED"
  | "TASK_COMPLETED"
  | "SPRINT_STARTED"
  | "SPRINT_COMPLETED"
  | "SUBSCRIPTION_CHANGED"
  | "PAYMENT_COMPLETED";

export type ActivityEntityType =
  | "ORGANIZATION"
  | "MEMBER"
  | "TEAM"
  | "PROJECT"
  | "SPRINT"
  | "TASK"
  | "COMMENT"
  | "SUBSCRIPTION"
  | "PAYMENT";

export interface IActivityLog {
  id: string;
  organizationId: string;
  userId: string;
  action: ActivityAction;
  entityType: ActivityEntityType;
  entityId: string;
  description: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export interface IActivityLogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IGetActivityLogsResponse {
  success: boolean;
  message: string;
  data: {
    data: IActivityLog[];
    pagination: IActivityLogPagination;
  };
}

export interface IGetActivityLogsQuery {
  page?: number;
  limit?: number;
}