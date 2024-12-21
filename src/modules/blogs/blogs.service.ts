// src/modules/blogs/blogs.service.ts
import { PrismaClient, type Blog } from '@prisma/client';
import { HttpNotFoundError, HttpUnprocessableEntityError } from '@/lib/errors';

const prisma = new PrismaClient();

class BlogService {
  // Create a new blog
  public createBlog = async (data: {
    title: string;
    content: string;
    blogImage?: string;
  }): Promise<Blog> => {
    if (!data.title || !data.content) {
      throw new HttpUnprocessableEntityError('Title and content are required');
    }

    const blog = await prisma.blog.create({
      data,
    });

    return blog;
  };

  // Get all blogs with pagination
  public getAllBlogs = async (
    page: number,
    limit: number
  ): Promise<{ blogs: Blog[]; total: number }> => {
    const skip = (page - 1) * limit;

    const [blogs, total] = await prisma.$transaction([
      prisma.blog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.blog.count(),
    ]);

    return { blogs, total };
  };

  // Get a single blog by ID
  public getBlogById = async (id: string): Promise<Blog | null> => {
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    if (!blog) {
      throw new HttpNotFoundError('Blog not found for the provided ID');
    }
    return blog;
  };

  // Update a blog
  public updateBlog = async (
    id: string,
    data: {
      title?: string;
      content?: string;
      blogImage?: string;
    }
  ): Promise<Blog> => {
    const blog = await prisma.blog.update({
      where: { id },
      data,
    });

    if (!blog) {
      throw new HttpNotFoundError('Blog not found for the provided ID');
    }
    return blog;
  };

  // Delete a blog
  public deleteBlog = async (id: string): Promise<Blog> => {
    const blog = await prisma.blog.delete({
      where: { id },
    });

    if (!blog) {
      throw new HttpNotFoundError('Blog not found for the provided ID');
    }
    return blog;
  };
}

export default BlogService;
