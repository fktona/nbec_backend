import { z } from 'zod';

export const createSuccessStorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  picture: z.string().url('Invalid picture URL').optional(),
  score: z.number().min(0, 'Score is required and must be a positive integer'),
  university: z.string().min(1, 'University is required'),
});

export const updateSuccessStorySchema = createSuccessStorySchema.partial();
