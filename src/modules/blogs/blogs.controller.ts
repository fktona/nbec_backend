// src/modules/blogs/blogs.controller.ts
import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import BlogService from './blogs.service';
import Api from '@/lib/api';

class BlogController extends Api {
  private readonly blogService = new BlogService();

  public createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, content, blogImage } = req.body;
      const blog = await this.blogService.createBlog({
        title,
        content,
        blogImage,
      });
      this.send(res, blog, HttpStatusCode.Created, 'Blog created successfully');
    } catch (error) {
      next(error);
    }
  };

  // Get all blogs with pagination
  public getAllBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { blogs, total } = await this.blogService.getAllBlogs(page, limit);
      const result = {
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
      this.send(res, result, HttpStatusCode.Ok, 'Blogs fetched successfully');
    } catch (error) {
      next(error);
    }
  };

  public getBlogById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const blog = await this.blogService.getBlogById(String(id));
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      this.send(res, blog, HttpStatusCode.Ok, 'Blog fetched successfully');
    } catch (error) {
      next(error);
    }
  };

  public updateBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { title, content, blogImage } = req.body;
      const blog = await this.blogService.updateBlog(String(id), {
        title,
        content,
        blogImage,
      });
      this.send(res, blog, HttpStatusCode.Ok, 'Blog updated successfully');
    } catch (error) {
      next(error);
    }
  };

  public deleteBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const blog = await this.blogService.deleteBlog(String(id));
      this.send(res, blog, HttpStatusCode.Ok, 'Blog deleted successfully');
    } catch (error) {
      next(error);
    }
  };
}

export default new BlogController();
