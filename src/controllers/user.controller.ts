import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import User from '../models/users.model';
import { mongo } from 'mongoose';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id);
  res.json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.sendStatus(204);
};

export const login = async (req: Request, res: Response) => {
  const user = await userService.getUser(req.params.id) as mongo.Document;
  if(user != null){
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    return res.status(200).json({ token });
  }
  
  res.json(user);
};
