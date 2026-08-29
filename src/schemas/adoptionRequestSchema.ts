import { z } from "zod";

export const adoptionRequestSchema = z.object({
  applicantName: z.string().trim().min(2, "Please enter your full name."),
  githubProfile: z
    .string()
    .trim()
    .url("Enter a valid GitHub profile URL.")
    .refine((url) => /^https:\/\/github\.com\/[A-Za-z\d-]+\/?$/.test(url), {
      message: "Use a GitHub profile URL, for example https://github.com/your-username.",
    }),
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/, "Enter a 10–15 digit phone number."),
  message: z.string().trim().min(20, "Tell us more in at least 20 characters."),
});

export type AdoptionRequestFormValues = z.infer<typeof adoptionRequestSchema>;
