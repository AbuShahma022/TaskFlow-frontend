import api from "@/lib/axios";

import type {
  IGetActivityLogsQuery,
  IGetActivityLogsResponse,
} from "@/types/activity-log";

export const activityLogService = {
  getActivityLogs: async (
    organizationId: string,
    params?: IGetActivityLogsQuery,
  ): Promise<IGetActivityLogsResponse> => {
    const response = await api.get<IGetActivityLogsResponse>(
      `/organizations/${organizationId}/activity-logs`,
      {
        params,
      },
    );

    return response.data;
  },
};