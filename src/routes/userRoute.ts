import { Router, Request, Response } from 'express';
import userController from '../controllers/userController';

const userRoute = Router();

userRoute.post('/users', userController.createUser);

export default userRoute;
