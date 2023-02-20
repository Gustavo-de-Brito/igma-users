import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import userRoute from './routes/userRoute';
import errorHandlerMiddleware from './middlewares/errorHadlerMiddleware';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    this.middlewareError();
  }

  private middlewares(): void {
    this.express.use(json());
    this.express.use(cors());
  }

  private middlewareError(): void {
    this.express.use(errorHandlerMiddleware);
  }

  private routes(): void {
    this.express.use(userRoute);
  }
}


export default new App().express;