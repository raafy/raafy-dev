import { z } from "zod";

// Auth validators
export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export const verifyOTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must be numeric"),
});

// Project validators
const projectTranslationsSchema = z
  .record(
    z.string(),
    z.object({
      title: z.union([z.string().max(200, "Title too long"), z.literal("")]).optional(),
      description: z
        .union([z.string().max(2000, "Description too long"), z.literal("")])
        .optional(),
    })
  )
  .optional();

const baseProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().min(1, "Description is required").max(2000, "Description too long"),
  translations: projectTranslationsSchema,
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
  techStack: z.array(z.string().min(1, "Technology cannot be empty")).min(1, "At least one technology required"),
  platforms: z.array(z.string().min(1, "Platform cannot be empty")).min(1, "At least one platform required"),
  categories: z.array(z.string().min(1, "Category cannot be empty")).min(1, "At least one category required"),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveDemoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required").or(z.date()),
  endDate: z.string().optional().or(z.date()).nullable(),
  featured: z.boolean().default(false),
  status: z.enum(["active", "archived"]).default("active"),
  order: z.number().int().min(0, "Order must be a non-negative integer").default(0),
});

const updateProjectBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long").optional(),
  description: z.string().min(1, "Description is required").max(2000, "Description too long").optional(),
  translations: projectTranslationsSchema,
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required").optional(),
  techStack: z.array(z.string().min(1, "Technology cannot be empty")).min(1, "At least one technology required").optional(),
  platforms: z.array(z.string().min(1, "Platform cannot be empty")).min(1, "At least one platform required").optional(),
  categories: z.array(z.string().min(1, "Category cannot be empty")).min(1, "At least one category required").optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")).optional(),
  liveDemoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")).optional(),
  startDate: z.string().min(1, "Start date is required").or(z.date()).optional(),
  endDate: z.string().optional().or(z.date()).nullable().optional(),
  featured: z.boolean().optional(),
  status: z.enum(["active", "archived"]).optional(),
  order: z.number().int().min(0, "Order must be a non-negative integer").optional(),
});

export const createProjectSchema = baseProjectSchema.refine((data) => {
  if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    return false;
  }
  return true;
}, {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

export const updateProjectSchema = updateProjectBaseSchema.refine((data) => {
  if (data.endDate && data.startDate && new Date(data.endDate) < new Date(data.startDate)) {
    return false;
  }
  return true;
}, {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

// Contact form validator
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message too long"),
  altchaPayload: z.string().min(1, "Captcha verification is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOTPInput = z.infer<typeof verifyOTPSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
