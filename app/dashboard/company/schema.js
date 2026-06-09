import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3, "company name must be atleast three characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().min(2, "Location is required"),
  users: z.array(z.coerce.number()).optional(),
  // createdBy: z.number().optional(),
});
