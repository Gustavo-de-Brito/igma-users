import { Request, Response } from 'express';
import { SendUser } from '../types/userTypes';
import userService from '../services/userService';

class userController {

  public async createUser(req: Request, res: Response): Promise<Response> {
    const newUser: SendUser = req.body;

    await userService.registerUser(newUser);
  
    return res.sendStatus(201);
  }
}

export default new userController();
