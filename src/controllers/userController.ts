import { Request, Response } from 'express';
import { SendUser } from '../types/userTypes';
import userService from '../services/userService';

class userController {

  public async createUser(req: Request, res: Response): Promise<Response> {
    const newUser: SendUser = req.body;

    userService.registerUser(newUser);
  
    return res.status(501).send('POST users route');
  }
}

export default new userController();
