import e from 'express';
import { z } from 'zod';
import students from '@/modules/students/students.route';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  sex: z.string().min(1, 'Sex is required'),
  desiredCourse: z.string().min(1, 'Desired course is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  preferredInstitution: z.string().min(1, 'Preferred institution is required'),
  mobileNumber: z.string().min(1, 'Mobile number is required'),
  subjectCombination: z
    .array(z.string())
    .min(1, 'At least one subject combination is required'),
  parentsPhoneNumber: z.string().min(1, "Parent's phone number is required"),
  desiredUTMEScore: z
    .number()
    .int('UTME score must be an integer')
    .min(1, 'Desired UTME score is required'),
  doneUTMEBefore: z.boolean({
    required_error: 'Please specify if UTME has been done before',
  }),
  previousScore: z
    .number()
    .min(1, 'Previous score must be greater than 0')
    .refine((val) => Number.isInteger(val), 'Previous score must be an integer')
    .optional()
    .nullable(),
});

export type CreateStudentInput = z.infer<typeof createUserSchema>;

export const LoginStudentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginStudentInput = z.infer<typeof LoginStudentSchema>;
