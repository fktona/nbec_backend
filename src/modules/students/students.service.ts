import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  type CreateStudentInput,
  type LoginStudentInput,
} from '@/schema/stundents.schema';
import generateAccessToken, {
  generateDefaultPassword,
  generateStudentId,
} from '@/utils/helper';
import logger from '@/lib/logger';
import sendEmail from '@/utils/mail';
import students from './students.route';

const prisma = new PrismaClient();

export default class StudentsService {
  // Create a student and ensure unique studentId
  public async createStudent(data: CreateStudentInput & { studentId: string }) {
    let studentId = '';
    let isUnique = false;

    // Loop until a unique studentId is generated
    while (!isUnique) {
      studentId = generateStudentId();
      const existingStudent = await prisma.students.findUnique({
        where: { studentId }, // Assuming your schema has a unique `studentId` field
      });

      if (!existingStudent) {
        isUnique = true;
      }
    }

    // Create the student with the unique studentId
    const user = await prisma.students.create({
      data: {
        ...data,
        studentId,
      },
    });

    await sendEmail({
      to: data.email,
      subject: 'Registration successful',
      templateName: 'registration',
      templateData: {
        registrationType: 'UTME',
        studentName: user.firstName,
      },
    });

    return user;
  }

  // Approve a student by updating their status
  public async approveStudent(data: CreateStudentInput, id: string) {
    const studentDefaultPassword = generateDefaultPassword();
    logger.info(
      `Default password for student with id ${id} is ${studentDefaultPassword}`
    );
    const user = await prisma.students.update({
      where: { id: String(id) },
      data: {
        ...data,
        status: 'approved',
        password: await bcrypt.hash(studentDefaultPassword, 10),
      },
    });

    await sendEmail({
      to: data.email,
      subject: 'Registration successful',
      templateName: 'student-approve',
      templateData: {
        registrationType: 'UTME',
        studentName: user.firstName,
        studentId: user.studentId,
        password: studentDefaultPassword,
      },
    });

    return user;
  }

  public async getStudents() {
    const students = await prisma.students.findMany();
    return students;
  }

  public async getStudentById(id: string) {
    const student = await prisma.students.findUnique({
      where: { id },
    });

    return student;
  }

  public async updateStudent(data: CreateStudentInput, id: string) {
    const student = await prisma.students.update({
      where: { id },
      data,
    });

    return student;
  }

  public async deleteStudent(id: string) {
    const student = await prisma.students.delete({
      where: { id },
    });

    return student;
  }

  public async getStudentByStudentId(studentId: string) {
    const student = await prisma.students.findUnique({
      where: { studentId },
    });

    return student;
  }

  public async studentLogin(data: LoginStudentInput) {
    const student = await prisma.students.findUnique({
      where: { studentId: data.studentId },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    // Compare the password with the hashed password
    if (!student.password) {
      throw new Error('Password not set for this student');
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      student.password
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const accessToken = generateAccessToken(
      { userId: student.id, ...data },
      'student'
    );

    return { student, accessToken };
  }
}
