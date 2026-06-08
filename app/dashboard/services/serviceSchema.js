import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters"),
  description: z.string().min(2, "Description is required"),
});
