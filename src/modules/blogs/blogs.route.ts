import express from 'express';
import BlogController from './blogs.controller';
import { validateData } from '@/middlewares/zod-validator';
import { createBlogSchema } from '@/schema/blogs.schema';

const blogs = express.Router();

/**
 * @typedef {object} CreateBlogBody
 * @property {string} title.required - Title of the blog
 * @property {string} content.required - Content of the blog
 * @property {string} authorId.required - ID of the author of the blog
 *@example request - Example request body
 * {
 *   "title": "How to Create a Blog with Prisma",
 *   "content": "In this blog, we will learn how to create a blog with Prisma and Express.",
 *   "authorId": "ckxy3hzgl0000g8d5hgg2sf30"
 * }
 */

/**
 * @typedef {object} Blog
 * @property {string} id - Unique ID of the blog
 * @property {string} title - Title of the blog
 * @property {string} content - Content of the blog
 * @property {string} authorId - ID of the author
 * @property {Date} createdAt - Blog creation date
 * @property {Date} updatedAt - Blog update date
 */

/**
 * POST /blogs
 * @summary Create a new blog
 * @tags blogs
 * @param {CreateBlogBody} request.body.required - Blog data
 * @returns {Blog} 201 - Blog successfully created
 * @returns {Error} 400 - Invalid input data
 * @example request - Example request body
 *  {
 *   "title": "How to Create a Blog with Prisma",
 *   "content": "In this blog, we will learn how to create a blog with Prisma and Express.",
 *   "authorId": "ckxy3hzgl0000g8d5hgg2sf30"
 * }
 */
blogs.post('/', validateData(createBlogSchema), BlogController.createBlog);

/**
 * GET /blogs
 * @summary Get all blogs
 * @tags blogs
 * @returns {Array<Blog>} 200 - List of blogs
 * @returns {Error} 500 - Internal server error
 */
blogs.get('/', BlogController.getAllBlogs);

/**
 * GET /blogs/{id}
 * @summary Get a single blog by ID
 * @tags blogs
 * @param {string} id.path.required - The ID of the blog to retrieve
 * @returns {Blog} 200 - Blog data
 * @returns {Error} 404 - Blog not found
 */
blogs.get('/:id', BlogController.getBlogById);

/**
 * PATCH /blogs/{id}
 * @summary Update a blog
 * @tags blogs
 * @param {string} id.path.required - The ID of the blog to update
 * @param {CreateBlogBody} request.body.required - Blog data
 * @returns {Blog} 200 - Blog updated successfully
 * @returns {Error} 404 - Blog not found
 */

blogs.patch('/:id', BlogController.updateBlog);

/**
 * DELETE /blogs/{id}
 * @summary Delete a blog
 * @tags blogs
 * @param {string} id.path.required - The ID of the blog to delete
 * @returns {Blog} 200 - Blog deleted successfully
 * @returns {Error} 404 - Blog not found
 */

blogs.delete('/:id', BlogController.deleteBlog);

export default blogs;
