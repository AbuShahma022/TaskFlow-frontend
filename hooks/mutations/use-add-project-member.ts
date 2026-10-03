import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useAddProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      data: {
        userId: string;
      };
    }) =>
      projectService.addProjectMember(
        organizationId,
        projectId,
        data,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.DETAIL(
          variables.projectId,
        ),
      });
    },
  });
};