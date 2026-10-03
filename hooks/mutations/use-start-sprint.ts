import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sprintService } from "@/services/sprint.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useStartSprint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      sprintId,
    }: {
      organizationId: string;
      projectId: string;
      sprintId: string;
    }) =>
      sprintService.startSprint(
        organizationId,
        projectId,
        sprintId,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SPRINTS.LIST(
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