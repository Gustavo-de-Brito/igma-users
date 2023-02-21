import { Request, Response } from 'express';
import { DatabaseUser, SendUser } from '../types/userTypes';
import userService from '../services/userService';

class userController {

  public async createUser(req: Request, res: Response): Promise<Response> {
    const newUser: SendUser = req.body;

    await userService.registerUser(newUser);
  
    return res.sendStatus(201);
  }

  public async getUserByCpf(req: Request, res: Response): Promise<Response> {
    const userCpf: string = req.params.cpf;

    const user: DatabaseUser = await userService.findUserByCpf(userCpf);

    return res.status(200).send(user);
  }
}

export default new userController();
