import { type NextFunction, type Request } from 'express';
import { type User } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class UserController extends Api {
  private readonly userService = new UserService();

  public createUser = async (
    req: Request,
    res: CustomResponse<User>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };

  public getUsers = async (
    req: Request,
    res: CustomResponse<User[]>,
    next: NextFunction
  ) => {
    try {
      const users = await this.userService.getUsers();
      this.send(res, users, HttpStatusCode.Ok, 'getUsers');
    } catch (e) {
      next(e);
    }
  };

  public getUserById = async (
    req: Request,
    res: CustomResponse<User | null>,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      if (!user) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ message: 'User not found', data: null });
      }
      this.send(res, user, HttpStatusCode.Ok, 'getUserById');
    } catch (e) {
      next(e);
    }
  };
}
