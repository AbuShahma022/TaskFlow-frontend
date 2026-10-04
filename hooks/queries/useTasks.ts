import { useQuery } from "@tanstack/react-query";

import { taskService } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IGetTasksQuery } from "@/types/task";

export const useTasks = (
  organizationId: string,
  projectId: string,
  params?: IGetTasksQuery,
) => {
  return useQuery({
 queryKey: [
  ...QUERY_KEYS.TASKS.LIST(organizationId, projectId),
  params,
],
    queryFn: () =>
      taskService.getTasks(
        organizationId,
        projectId,
        params,
      ),
    enabled: Boolean(organizationId && projectId),
  });
};