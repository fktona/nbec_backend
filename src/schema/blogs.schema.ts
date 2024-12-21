import { z } from 'zod';

// Zod schema for creating a blog
export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(150, { message: 'Title must be less than 150 characters' }),
  content: z
    .string()
    .min(1, { message: 'Content is required' })
    .max(5000, { message: 'Content must be less than 5000 characters' }),
  // authorId: z.string().cuid({ message: 'Invalid author ID' }),
});

// Zod schema for getting a blog by ID
export const getBlogByIdSchema = z.object({
  id: z.string().cuid({ message: 'Invalid blog ID' }),
});

// Zod schema for updating a blog
export const updateBlogSchema = z.object({
  id: z.string().cuid({ message: 'Invalid blog ID' }),
  title: z
    .string()
    .min(1, { message: 'Title must not be empty' })
    .max(150, { message: 'Title must be less than 150 characters' })
    .optional(),
  content: z
    .string()
    .min(1, { message: 'Content must not be empty' })
    .max(5000, { message: 'Content must be less than 5000 characters' })
    .optional(),
});

// Zod schema for deleting a blog
export const deleteBlogSchema = z.object({
  id: z.string().cuid({ message: 'Invalid blog ID' }),
});
