import { PrismaClient, type Testimonial } from '@prisma/client';

const prisma = new PrismaClient();

export default class TestimonialService {
  // Create a testimonial
  public createTestimonial = async (
    data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Testimonial> => {
    return await prisma.testimonial.create({
      data,
    });
  };

  public createExternalTestimonial = async (
    data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Testimonial> => {
    return await prisma.testimonial.create({
      data,
    });
  };

  public approveTestimonial = async (id: string): Promise<Testimonial> => {
    return await prisma.testimonial.update({
      where: { id },
      data: { isApproved: true },
    });
  };

  // Get all testimonials
  public getAllTestimonials = async (): Promise<Testimonial[]> => {
    return await prisma.testimonial.findMany();
  };

  // Get testimonial by ID
  public getTestimonialById = async (
    id: string
  ): Promise<Testimonial | null> => {
    return await prisma.testimonial.findUnique({
      where: { id },
    });
  };

  public updateTestimonial = async (
    id: string,
    data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Testimonial> => {
    return await prisma.testimonial.update({
      where: { id },
      data,
    });
  };

  public deleteTestimonial = async (id: string): Promise<Testimonial> => {
    return await prisma.testimonial.delete({
      where: { id },
    });
  };
}
