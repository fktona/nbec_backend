import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import generateAccessToken, { generateDefaultPassword } from '@/utils/helper';
import logger from '@/lib/logger';
import {
  type CreateAdminInput,
  type LoginAdminInput,
} from '@/schema/admin.schema';

const prisma = new PrismaClient();

export default class AdminService {
  // Create an admin
  public async createAdmin(data: CreateAdminInput) {
    const adminDefaultPassword = generateDefaultPassword();
    console.log(adminDefaultPassword);
    const admin = await prisma.admins.create({
      data: {
        ...data,
        password: await bcrypt.hash(adminDefaultPassword, 10),
      },
    });
    logger.info(`Admin created with default password: ${adminDefaultPassword}`);
    return admin;
  }

  // Get all admins
  public async getAdmins() {
    const admins = await prisma.admins.findMany();
    return admins;
  }

  // Get admin by ID
  public async getAdminById(id: string) {
    const admin = await prisma.admins.findUnique({
      where: { id },
    });
    return admin;
  }

  // Get admin by username

  public async getAdminByUsername(username: string) {
    const admin = await prisma.admins.findUnique({
      where: { username },
    });
    return admin;
  }

  // Update admin
  public async updateAdmin(data: CreateAdminInput, id: string) {
    const admin = await prisma.admins.update({
      where: { id },
      data,
    });
    return admin;
  }

  // Delete admin
  public async deleteAdmin(id: string) {
    const admin = await prisma.admins.delete({
      where: { id },
    });
    return admin;
  }

  // Admin login
  public async adminLogin(data: LoginAdminInput) {
    const admin = await prisma.admins.findUnique({
      where: { username: data.username },
    });

    if (!admin) {
      throw new Error('Admin not found');
    }

    const isValidPassword = await bcrypt.compare(data.password, admin.password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const accessToken = generateAccessToken(
      { userId: admin.id, ...data },
      'admin'
    );

    return { admin, accessToken };
  }

  public async verifyAdmin(req: any) {
    return req.user;
  }
}
