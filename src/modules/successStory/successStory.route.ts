import express from 'express';
import SuccessStoryController from './successStory.controller';
import { validateData } from '@/middlewares/zod-validator';
import {
  createSuccessStorySchema,
  updateSuccessStorySchema,
} from '@/schema/succesStory.schema';

const successStories = express.Router();

/**
 * @typedef {object} CreateSuccessStoryBody
 * @property {string} name.required - Name of the success story
 * @property {string} picture - Optional picture URL
 * @property {number} score.required - Score related to the success story
 * @property {string} university.required - Name of the university
 * @example request - Example request body
 * {
 *   "name": "Startup Success Story",
 *   "picture": "https://example.com/success-story.jpg",
 *   "score": 90,
 *   "university": "XYZ University"
 * }
 */

/**
 * @typedef {object} SuccessStory
 * @property {string} id - Unique ID of the success story
 * @property {string} name - Name of the success story
 * @property {string} picture - URL of the picture
 * @property {number} score - Score of the success story
 * @property {string} university - University name
 * @property {Date} createdAt - Date of creation
 * @property {Date} updatedAt - Date of last update
 */

/**
 * POST /success-stories
 * @summary Create a new success story
 * @tags success-stories
 * @param {CreateSuccessStoryBody} request.body.required - Success story data
 * @returns {SuccessStory} 201 - Success story created successfully
 * @returns {Error} 400 - Invalid input data
 */
successStories.post(
  '/',
  validateData(createSuccessStorySchema),
  SuccessStoryController.createSuccessStory
);

/**
 * GET /success-stories
 * @summary Get all success stories with pagination
 * @tags success-stories
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Number of items per page (default: 10)
 * @returns {Array<SuccessStory>} 200 - List of success stories
 * @returns {Error} 500 - Internal server error
 */
successStories.get('/', SuccessStoryController.getAllSuccessStories);

/**
 * GET /success-stories/{id}
 * @summary Get a single success story by ID
 * @tags success-stories
 * @param {string} id.path.required - The ID of the success story
 * @returns {SuccessStory} 200 - Success story data
 * @returns {Error} 404 - Success story not found
 */
successStories.get('/:id', SuccessStoryController.getSuccessStoryById);

/**
 * PATCH /success-stories/{id}
 * @summary Update a success story
 * @tags success-stories
 * @param {string} id.path.required - The ID of the success story
 * @param {CreateSuccessStoryBody} request.body.required - Success story data
 * @returns {SuccessStory} 200 - Success story updated successfully
 * @returns {Error} 404 - Success story not found
 */
successStories.patch(
  '/:id',
  validateData(updateSuccessStorySchema),
  SuccessStoryController.updateSuccessStory
);

/**
 * DELETE /success-stories/{id}
 * @summary Delete a success story
 * @tags success-stories
 * @param {string} id.path.required - The ID of the success story
 * @returns {SuccessStory} 200 - Success story deleted successfully
 * @returns {Error} 404 - Success story not found
 */
successStories.delete('/:id', SuccessStoryController.deleteSuccessStory);

export default successStories;
