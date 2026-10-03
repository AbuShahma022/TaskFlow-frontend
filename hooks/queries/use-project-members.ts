import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IGetProjectMembersQuery } from "@/types/project";

export const useProjectMembers = (
  organizationId: string | undefined,
  projectId: string | undefined,
  params?: IGetProjectMembersQuery,
) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.PROJECTS.MEMBERS(
        organizationId ?? "",
        projectId ?? "",
      ),
      params,
    ],

    queryFn: () =>
      projectService.getProjectMembers(
        organizationId!,
        projectId!,
        params,
      ),

    enabled: Boolean(
      organizationId && projectId,
    ),
  });
};