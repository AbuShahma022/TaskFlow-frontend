import { useQuery } from "@tanstack/react-query";

import { sprintService } from "@/services/sprint.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IGetSprintsQuery } from "@/types/sprint";

export const useSprints = (
  organizationId: string | undefined,
  projectId: string | undefined,
  params?: IGetSprintsQuery,
) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.SPRINTS.LIST(projectId ?? ""),
      params,
    ],

    queryFn: () =>
      sprintService.getSprints(
        organizationId!,
        projectId!,
        params,
      ),

    enabled: !!organizationId && !!projectId,
  });
};