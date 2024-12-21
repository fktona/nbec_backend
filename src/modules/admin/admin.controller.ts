import { type Request, type Response, type NextFunction } from 'express';
import { HttpStatusCode } from 'axios';
import AdminService from './admin.service';
import Api from '@/lib/api';
import { createAdminSchema } from '@/schema/admin.schema';

export default class AdminController extends Api {
  private readonly adminService = new AdminService();

  public createAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      // Pass the validated data to the service
      const admin = await this.adminService.createAdmin(req.body);

      this.send(
        res,
        admin,
        HttpStatusCode.Created,
        'Admin created successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const admins = await this.adminService.getAdmins();

      this.send(
        res,
        admins,
        HttpStatusCode.Ok,
        'Admins retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getAdminById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const admin = await this.adminService.getAdminById(id);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public updateAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      const { id } = req.params;

      // Pass the validated data to the service
      const admin = await this.adminService.updateAdmin(req.body, id);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin updated successfully');
    } catch (error) {
      next(error);
    }
  };

  public deleteAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const admin = await this.adminService.deleteAdmin(id);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin deleted successfully');
    } catch (error) {
      next(error);
    }
  };

  public getAdminByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username } = req.params;

      const admin = await this.adminService.getAdminByUsername(username);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  public adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      // Pass the validated data to the service
      const admin = await this.adminService.adminLogin(req.body);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin logged in successfully');
    } catch (error) {
      next(error);
    }
  };

  public verifyAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate the request body

      // Pass the validated data to the service
      const admin = await this.adminService.verifyAdmin(req);

      this.send(res, admin, HttpStatusCode.Ok, 'Admin verified successfully');
    } catch (error) {
      next(error);
    }
  };
}
