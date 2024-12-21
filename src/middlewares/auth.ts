import { type NextFunction, type Request, type Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { HttpInternalServerError } from '@/lib/errors';
const prisma = new PrismaClient();

export const verifyAuthToken = async (
  // Remove underscore of params once you start using them
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Replace with your auth token verification strategy
  next();
};

const hashPasswordMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure password exists in the request body
    if (req.body.password) {
      const saltRounds = 10; // Adjust for security and performance balance
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ error: 'Failed to hash password' });
  }
};

export default hashPasswordMiddleware;

export const authMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status_code: '401',
        message: 'Invalid token',
      });
    }

    jwt.verify(token, 'admin', async (err, decoded: any) => {
      if (err) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }
      const user = await prisma.admins.findUnique({
        where: { id: decoded.userId as string },
      });
      if (!user) {
        return res.status(401).json({
          status_code: '401',
          message: 'Invalid token',
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    throw new HttpInternalServerError('Internal server error');
  }
};

export const authorize = (requiredRole: string) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
