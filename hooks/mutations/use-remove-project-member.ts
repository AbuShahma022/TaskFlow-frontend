import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      memberId,
    }: {
      organizationId: string;
      projectId: string;
      memberId: string;
    }) =>
      projectService.removeProjectMember(
        organizationId,
        projectId,
        memberId,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.MEMBERS(
          variables.organizationId,
          variables.projectId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.DETAIL(
          variables.projectId,
        ),
      });
    },
  });
};