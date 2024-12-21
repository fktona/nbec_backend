import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import StudentsService from './students.service';
import Api from '@/lib/api';

export default class StundentsController extends Api {
  private readonly studentsService = new StudentsService();

  public createStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      // Pass the validated data to the service
      const user = await this.studentsService.createStudent(req.body);

      this.send(
        res,
        user,
        HttpStatusCode.Created,
        'Student created successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public approveStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      const { id } = req.params;

      // Pass the validated data to the service
      const user = await this.studentsService.approveStudent(req.body, id);

      this.send(
        res,
        user,
        HttpStatusCode.Accepted,
        'Student approved successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const students = await this.studentsService.getStudents();

      this.send(
        res,
        students,
        HttpStatusCode.Ok,
        'Students retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getStudentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const student = await this.studentsService.getStudentById(id);

      this.send(
        res,
        student,
        HttpStatusCode.Ok,
        'Student retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      const { id } = req.params;

      // Pass the validated data to the service
      const student = await this.studentsService.updateStudent(req.body, id);

      this.send(
        res,
        student,
        HttpStatusCode.Ok,
        'Student updated successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const student = await this.studentsService.deleteStudent(id);

      this.send(
        res,
        student,
        HttpStatusCode.Ok,
        'Student deleted successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getStudentByStudentId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { studentId } = req.params;

      const student = await this.studentsService.getStudentByStudentId(
        studentId
      );

      this.send(
        res,
        student,
        HttpStatusCode.Ok,
        'Student retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public studentLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      // Pass the validated data to the service
      const student = await this.studentsService.studentLogin(req.body);

      this.send(
        res,
        student,
        HttpStatusCode.Ok,
        'Student logged in successfully'
      );
    } catch (error) {
      next(error);
    }
  };
}
