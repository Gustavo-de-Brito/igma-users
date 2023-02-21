import { Router } from 'express';
import userController from '../controllers/userController';
import paginationQueryMiddleware from '../middlewares/paginationQueryMiddleware';
import schemaValidation from '../middlewares/schemaMiddleware';
import userSchema from '../shemas/userSchema';

const userRoute = Router();

userRoute.post('/users', schemaValidation(userSchema), userController.createUser);
userRoute.get('/users/:cpf', userController.getUserByCpf);
userRoute.get('/users', paginationQueryMiddleware, userController.getUsers);

export default userRoute;
