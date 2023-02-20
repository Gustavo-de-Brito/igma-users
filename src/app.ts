import express, { json } from 'express';
import cors from 'cors';

import userRoute from './routes/userRoute';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(userRoute);
  }
}


export default new App().express;