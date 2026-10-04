"use client";

import { useQuery } from "@tanstack/react-query";

import { activityLogService } from "@/services/activity-log.service";
import type { IGetActivityLogsQuery } from "@/types/activity-log";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useActivityLogs = (
  organizationId: string | undefined,
  params?: IGetActivityLogsQuery,
) => {
  return useQuery({
queryKey: [
  ...QUERY_KEYS.ACTIVITY_LOGS.LIST(organizationId!),
  params,
],

    queryFn: () =>
      activityLogService.getActivityLogs(
        organizationId!,
        params,
      ),

    enabled: Boolean(organizationId),
  });
};