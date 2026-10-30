import { z } from "zod";

export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your project in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;
