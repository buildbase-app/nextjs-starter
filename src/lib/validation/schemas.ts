import { z } from 'zod';

// ============================================
// Common Field Schemas
// ============================================

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters');

export const urlSchema = z.string().url('Invalid URL');

export const uuidSchema = z.string().uuid('Invalid ID format');

// ============================================
// Auth Schemas
// ============================================

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ============================================
// User Profile Schemas
// ============================================

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  image: urlSchema.optional().or(z.literal('')),
  timezone: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  currency: z.string().optional(),
});

// ============================================
// Workspace Schemas
// ============================================

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, 'Workspace name must be at least 2 characters')
    .max(50, 'Workspace name must be less than 50 characters'),
});

export const inviteUserSchema = z.object({
  email: emailSchema,
  role: z.enum(['admin', 'member', 'viewer'], {
    errorMap: () => ({ message: 'Invalid role' }),
  }),
});

// ============================================
// API Request Schemas
// ============================================

export const authCodeSchema = z.object({
  code: z
    .string()
    .min(20, 'Invalid authorization code')
    .max(128, 'Invalid authorization code')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid authorization code format'),
});

export const workspaceTokenSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  workspaceId: z.string().min(1, 'Workspace ID is required'),
  userRole: z.string().default('member'),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ============================================
// Type Exports
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
export type AuthCodeInput = z.infer<typeof authCodeSchema>;
export type WorkspaceTokenInput = z.infer<typeof workspaceTokenSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
