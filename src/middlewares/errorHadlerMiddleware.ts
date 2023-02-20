import { Request, Response, NextFunction } from 'express';
import { ICustomError, ErrorUtils } from '../utils/errorUtils';

function errorHandlerMiddleware(
  err: TypeError | ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if( ErrorUtils.isCustomError(err) ) {
    const statusCode = ErrorUtils.getErrorStatusCode((err as ICustomError).type);

    return res.status(statusCode).send(err.message);
  }

  res.sendStatus(500);
}

export default errorHandlerMiddleware;