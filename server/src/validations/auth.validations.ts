import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z
      .string()
      .nonempty('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must not exceed 100 characters')
      .trim(),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Invalid email format')
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .nonempty('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(128, 'Password must not exceed 128 characters'),
});