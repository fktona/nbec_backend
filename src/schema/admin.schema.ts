import { z } from 'zod';

// Input schema for creating an admin
export const createAdminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email'),
});

// Input schema for admin login
export const loginAdminSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

// Export types
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type LoginAdminInput = z.infer<typeof loginAdminSchema>;
