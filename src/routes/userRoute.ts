import { Router } from 'express';
import userController from '../controllers/userController';
import schemaValidation from '../middlewares/schemaMiddleware';
import userSchema from '../shemas/userSchema';

const userRoute = Router();

userRoute.post('/users', schemaValidation(userSchema), userController.createUser);

export default userRoute;
