import { Request, Response } from 'express';

class userController {

  public async createUser(req: Request, res: Response): Promise<Response> {
    return res.status(501).send('POST users route');
  }
}

export default new userController();
