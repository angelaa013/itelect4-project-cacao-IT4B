import { z } from "zod";

export const adoptionRequestSchema = z
  .object({
    adopterName: z
      .string()
      .min(3, { message: "Name must be at least 3 characters." })
      .max(50, { message: "Name must be less than 50 characters." }),
    githubUrl: z.string().url({ message: "Please enter a valid URL." }),
    contact: z
      .string()
      .min(11, { message: "Contact number must be at least 11 digits." })
      .max(15, { message: "Contact number is too long." })
      .regex(/^\+?[0-9]+$/, {
        message: "Contact number can only contain digits and an optional leading +",
      }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." })
      .max(200, { message: "Address must be less than 200 characters." }),
  })
  .refine(
    (data) => data.githubUrl.includes("github.com"),
    {
      message: "URL must be a valid github.com link",
      path: ["githubUrl"],
    }
  );

export type AdoptionRequestFormData = z.infer<typeof adoptionRequestSchema>;
