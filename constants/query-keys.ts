export const QUERY_KEYS = {
  AUTH: {
    ME: ["auth", "me"] as const,
  },



  ORGANIZATIONS: {
    ALL: ["organizations"] as const,
    LIST: ["organizations", "list"],
  },
} as const;