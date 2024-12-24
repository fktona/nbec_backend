import express from 'express';
import TestimonialController from './testimonials.controller';
import { validateData } from '@/middlewares/zod-validator';
import { createTestimonialSchema } from '@/schema/testimonial.schema';

const testimonial = express.Router();

/**
 * @typedef {object} CreateTestimonialBody
 * @property {string} name.required - Name of the person giving the testimonial
 * @property {string} message.required - The testimonial message
 * @property {string} position.required - Position of the person giving the testimonial
 * @property {string} company.required - Company of the person giving the testimonial
 *
 * @example {
 *   "name": "Jane Doe",
 *   "message": "Excellent service!",
 *   "position": "CTO",
 *   "company": "Tech Innovations"
 * }
 */

/**
 * @typedef {object} Testimonial
 * @property {string} id - Testimonial ID
 * @property {string} name - Name of the person
 * @property {string} message - Testimonial message
 * @property {string} position - Position of the person
 * @property {string} company - Company of the person
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last updated date
 */

/**
 * POST /testimonials
 * @summary Create a new testimonial
 * @tags testimonials
 * @param {CreateTestimonialBody} request.body.required - Testimonial data
 * @returns {Testimonial} 201 - Testimonial successfully created
 * @example request - Create testimonial example
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "content": "Outstanding service!",
 *   "role": "Manager",
 *   "company": "Business Inc"
 * }
 */
testimonial.post(
  '/',
  validateData(createTestimonialSchema),
  TestimonialController.createTestimonial
);

/**
 * GET /testimonials
 * @summary Get all testimonials
 * @tags testimonials
 * @returns {Array<Testimonial>} 200 - List of testimonials
 */
testimonial.get('/', TestimonialController.getAllTestimonials);

/**
 * GET /testimonials/{id}
 * @summary Get a testimonial by ID
 * @tags testimonials
 * @param {string} id.path.required - Testimonial ID
 * @returns {Testimonial} 200 - The testimonial object
 * @returns {Error} 404 - Testimonial not found
 * @example response - 200 - Testimonial example
 * {
 *   "id": "cljf9rmvl0000l1hxi5wmjtby",
 *   "firstName": "Jane Doe",
 *  "lastName": "Smith",
 *   "content": "Outstanding service!",
 *   "position": "CTO",
 *   "company": "Tech Innovations",
 *   "createdAt": "2024-12-07T10:00:00Z",
 *   "updatedAt": "2024-12-07T10:00:00Z"
 * }
 */
testimonial.get('/:id', TestimonialController.getTestimonialById);

/**
 * POST /testimonials/external
 * @summary Create a new external testimonial
 * @tags testimonials
 * @param {CreateTestimonialBody} request.body.required - Testimonial data
 * @returns {Testimonial} 201 - Testimonial successfully created
 * @example request - Create external testimonial example
 * {
 *  "firstName": "John",
 * "lastName": "Doe",
 * "content": "Outstanding service!",
 * "role": "Manager",
 * "company": "Business Inc"
 * }
 */

testimonial.post(
  '/external',
  validateData(createTestimonialSchema),
  TestimonialController.createExternalTestimonial
);

/**
 * PATCH /testimonials/{id}/approve
 * @summary Approve a testimonial
 * @tags testimonials
 * @param {string} id.path.required - Testimonial ID
 * @returns {Testimonial} 200 - Testimonial successfully approved
 * @returns {Error} 404 - Testimonial not found
 */

testimonial.patch('/:id/approve', TestimonialController.approveTestimonial);

/**
 * PATCH /testimonials/{id}
 * @summary Update a testimonial
 * @tags testimonials
 * @param {string} id.path.required - Testimonial ID
 * @param {CreateTestimonialBody} request.body.required - Testimonial data
 * @returns {Testimonial} 200 - Testimonial successfully updated
 * @returns {Error} 404 - Testimonial not found
 */
testimonial.patch('/:id', TestimonialController.updateTestimonial);

/**
 * DELETE /testimonials/{id}
 * @summary Delete a testimonial
 * @tags testimonials
 * @param {string} id.path.required - Testimonial ID
 * @returns {Testimonial} 200 - Testimonial successfully deleted
 * @returns {Error} 404 - Testimonial not found
 */

testimonial.delete('/:id', TestimonialController.deleteTestimonial);

export default testimonial;
