import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import generateAccessToken, { generateDefaultPassword } from '@/utils/helper';
import logger from '@/lib/logger';
import {
  type CreateAdminInput,
  type LoginAdminInput,
} from '@/schema/admin.schema';
import sendEmail from '@/utils/mail';

const prisma = new PrismaClient();

export default class AdminService {
  // Create an admin
  public async createAdmin(data: CreateAdminInput) {
    try {
      const adminDefaultPassword = generateDefaultPassword();
      const hashedPassword = await bcrypt.hash(adminDefaultPassword, 10);

      const admin = await prisma.admins.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      logger.info(`Admin created: ${admin.username}`);

      await sendEmail({
        to: data.email,
        subject: 'Admin account created',
        templateName: 'admin-creation',
        templateData: {
          adminName: data.name,
          username: data.username,
          password: adminDefaultPassword,
          loginLink: `${process.env.ADMIN_URL}/login`,
        },
      });

      return admin;
    } catch (error) {
      logger.error('Error creating admin:', { error });
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Username or email already exists.');
        }
      }
      throw new Error('Failed to create admin. Please try again later.');
    }
  }

  // Get all admins
  public async getAdmins() {
    try {
      return await prisma.admins.findMany();
    } catch (error) {
      logger.error('Error fetching admins:', { error });
      throw new Error('Failed to fetch admins. Please try again later.');
    }
  }

  // Get admin by ID
  public async getAdminById(id: string) {
    try {
      const admin = await prisma.admins.findUnique({
        where: { id },
      });
      if (!admin) {
        throw new Error('Admin not found.');
      }
      return admin;
    } catch (error) {
      logger.error(`Error fetching admin with ID ${id}:`, { error });
      throw new Error('Failed to fetch admin. Please try again later.');
    }
  }

  // Get admin by username
  public async getAdminByUsername(username: string) {
    try {
      const admin = await prisma.admins.findUnique({
        where: { username },
      });
      if (!admin) {
        throw new Error('Admin not found.');
      }
      return admin;
    } catch (error) {
      logger.error(`Error fetching admin with username ${username}:`, {
        error,
      });
      throw new Error('Failed to fetch admin. Please try again later.');
    }
  }

  // Update admin
  public async updateAdmin(data: CreateAdminInput, id: string) {
    try {
      const admin = await prisma.admins.update({
        where: { id },
        data,
      });
      logger.info(`Admin updated: ${admin.username}`);
      return admin;
    } catch (error) {
      logger.error(`Error updating admin with ID ${id}:`, { error });
      throw new Error('Failed to update admin. Please try again later.');
    }
  }

  // Delete admin
  public async deleteAdmin(id: string) {
    try {
      const admin = await prisma.admins.delete({
        where: { id },
      });
      logger.info(`Admin deleted: ${admin.username}`);
      return admin;
    } catch (error) {
      logger.error(`Error deleting admin with ID ${id}:`, { error });
      throw new Error('Failed to delete admin. Please try again later.');
    }
  }

  // Admin login
  public async adminLogin(data: LoginAdminInput) {
    try {
      const admin = await prisma.admins.findUnique({
        where: { username: data.username },
      });

      if (!admin) {
        throw new Error('Invalid username or password.');
      }

      const isValidPassword = await bcrypt.compare(
        data.password,
        admin.password
      );

      if (!isValidPassword) {
        throw new Error('Invalid username or password.');
      }

      const accessToken = generateAccessToken({ userId: admin.id }, 'admin');

      logger.info(`Admin logged in: ${admin.username}`);
      return { admin, accessToken };
    } catch (error) {
      logger.error('Error during admin login:', { error });
      throw new Error('Login failed. Please try again later.');
    }
  }

  // Verify admin from request
  public async verifyAdmin(req: any) {
    try {
      if (!req.user) {
        throw new Error('Unauthorized access.');
      }
      return req.user;
    } catch (error) {
      logger.error('Error verifying admin:', { error });
      throw new Error('Failed to verify admin. Please try again later.');
    }
  }
}
