import { z } from 'zod';

// Define the Zod schema for creating a testimonial
export const createTestimonialSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'first name is required' })
    .max(100, { message: 'first name must be less than 100 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'last name is required' })
    .max(100, { message: 'last name must be less than 100 characters' }),
  content: z
    .string()
    .min(1, { message: 'content is required' })
    .max(500, { message: 'Message must be less than 500 characters' }),
  role: z
    .string()
    .min(1, { message: 'role is required' })
    .max(100, { message: 'role must be less than 100 characters' }),
  company: z
    .string()
    .min(1, { message: 'Company is required' })
    .max(100, { message: 'Company must be less than 100 characters' }),
});

// Define the Zod schema for getting a testimonial by ID
export const getTestimonialByIdSchema = z.object({
  id: z.string().cuid({ message: 'Invalid testimonial ID' }),
});

// Type for creating a testimonial
export type CreateTestimonialBody = z.infer<typeof createTestimonialSchema>;

// Type for fetching a testimonial by ID
export type GetTestimonialByIdParams = z.infer<typeof getTestimonialByIdSchema>;
