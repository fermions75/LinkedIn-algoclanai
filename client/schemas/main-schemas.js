import { z } from "zod";

export const PersonaSchema = z.object({
  job: z.string().min(1, "Job title is required"),
  industry: z.string().min(1, "Industry is required"),
  niche: z.string().min(1, "Niche is required"),
  experience: z.string().min(1, "Years experience is required"),
  expertise: z.string({
    required_error: "Please share your expertise",
  }),
});


export const PromptSchema = z.object({
  name: z.string().min(1, "Name is required"),
  text: z.string().min(1, "Prompt text is required"),
});