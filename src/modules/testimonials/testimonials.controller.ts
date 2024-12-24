import { type Request, type Response, type NextFunction } from 'express';
import { type Testimonial } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { date } from 'zod';
import TestimonialService from './testimonials.service';
import { type CustomResponse } from '@/types/common.type';

class TestimonialController {
  private readonly testimonialService = new TestimonialService();

  // Create a new testimonial
  public createTestimonial = async (
    req: any,
    res: CustomResponse<Testimonial>,
    next: NextFunction
  ) => {
    try {
      const { firstName, lastName, content, role, company, profileImage } =
        req.body;
      const testimonial = await this.testimonialService.createTestimonial({
        firstName,
        lastName,
        content,
        role,
        company,
        profileImage,
        isExternal: false, // or true, depending on your logic
        isApproved: true, // or true, depending on your logic
      });
      res.status(HttpStatusCode.Created).json({
        data: testimonial,
        message: 'Testimonial created successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  public createExternalTestimonial = async (
    req: any,
    res: CustomResponse<Testimonial>,
    next: NextFunction
  ) => {
    try {
      const { firstName, lastName, content, role, company, profileImage } =
        req.body;
      const testimonial =
        await this.testimonialService.createExternalTestimonial({
          firstName,
          lastName,
          content,
          role,
          company,
          profileImage,
          isExternal: true,
          isApproved: false,
        });
      res.status(HttpStatusCode.Created).json({
        data: testimonial,
        message: 'Testimonial created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public approveTestimonial = async (
    req: Request,
    res: CustomResponse<Testimonial>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.approveTestimonial(
        String(id)
      );
      res.status(200).json({
        data: testimonial,
        message: 'Testimonial approved successfully',
      });
    } catch (error) {
      next(error);
    }
  };
  // Get all testimonials
  public getAllTestimonials = async (
    req: Request,
    res: CustomResponse<Testimonial[]>,
    next: NextFunction
  ) => {
    try {
      const testimonials = await this.testimonialService.getAllTestimonials();
      res.status(200).json({
        data: testimonials,
        message: 'Testimonials fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Get a single testimonial by ID
  public getTestimonialById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.getTestimonialById(
        String(id)
      );
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      res.status(200).json({
        date: testimonial,
        message: 'Testimonial fetched successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateTestimonial = async (
    req: any,
    res: CustomResponse<Testimonial>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        content,
        role,
        company,
        profileImage,
        isApproved,
        isExternal,
      } = req.body;
      const testimonial = await this.testimonialService.updateTestimonial(
        String(id),
        {
          firstName,
          lastName,
          content,
          role,
          company,
          profileImage,
          isExternal,
          isApproved,
        }
      );
      res.status(200).json({
        data: testimonial,
        message: 'Testimonial updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteTestimonial = async (
    req: Request,
    res: CustomResponse<Testimonial>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.deleteTestimonial(
        String(id)
      );
      res.status(200).json({
        data: testimonial,
        message: 'Testimonial deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new TestimonialController();
