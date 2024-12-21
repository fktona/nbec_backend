import { PrismaClient, Blog } from '@prisma/client';
import { HttpNotFoundError, HttpUnprocessableEntityError } from '@/lib/errors';

const prisma = new PrismaClient();

class Instructors {
  private readonly prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createInstructor(data: any) {
    const instructor = await this.prisma.instructors.create({
      data,
    });
    return instructor;
  }

  public async getInstructors() {
    const instructors = await prisma.instructors.findMany();
    return instructors;
  }

  public async getInstructorById(id: number) {
    const instructor = await prisma.instructors.findUnique({
      where: { id },
    });
    if (!instructor) {
      throw new HttpNotFoundError('Instructor not found');
    }
    return instructor;
  }
}
