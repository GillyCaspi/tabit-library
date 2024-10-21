import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import users from '../models/users.model';
import { AuthenticatedRequest } from '../interfaces/AuthenticatedRequest';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as AuthenticatedRequest).user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

export const authorizeCustomerOrEmployee = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as AuthenticatedRequest).user.id;

  if ((req as AuthenticatedRequest).user.role === 'employee' || req.params.userId === userId) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: you can only access your own records' });
  }
};
