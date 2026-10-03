import { z } from "zod";

export const createSprintSchema = z.object({
  name: z.string().trim().min(2, "Sprint name must be at least 2 characters"),

  goal: z.string().trim().optional(),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().min(1, "End date is required"),
});

export type CreateSprintFormValues = z.infer<
  typeof createSprintSchema
>;