import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name is required")
    .max(100, "Project name is too long"),

  description: z
    .string()
    .max(500, "Description is too long")
    .optional(),
});

export type CreateProjectFormValues =
  z.infer<typeof createProjectSchema>;