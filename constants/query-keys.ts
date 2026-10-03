export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
  },

  ORGANIZATIONS: {
    ALL: ["organizations"] as const,
    LIST: ["organizations", "list"] as const,

    MEMBERS: (organizationId: string) =>
      ["organizations", "members", organizationId] as const,
  },

  PROJECTS: {
    LIST: ["projects", "list"] as const,

    DETAIL: (projectId: string) =>
      ["projects", "detail", projectId] as const,

    MEMBERS: (
      organizationId: string,
      projectId: string,
    ) =>
      [
        "projects",
        "members",
        organizationId,
        projectId,
      ] as const,
  },

  SPRINTS: {
    LIST: (
      organizationId: string,
      projectId: string,
    ) =>
      [
        "sprints",
        organizationId,
        projectId,
      ] as const,

    DETAIL: (
      organizationId: string,
      projectId: string,
      sprintId: string,
    ) =>
      [
        "sprint",
        organizationId,
        projectId,
        sprintId,
      ] as const,
  },
} as const;