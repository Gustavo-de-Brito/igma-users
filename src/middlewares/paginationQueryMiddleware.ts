import { Request, Response, NextFunction } from 'express';
import { ErrorUtils } from '../utils/errorUtils';

function paginationQueryMiddleware(req: Request, res: Response, next: NextFunction): void {
  const offset: string | undefined = req.query.offset as string;
  const limit: string | undefined = req.query.limit as string;
  const numberOffset: number = Number(offset);
  const numberLimit: number = Number(limit);

  if(typeof offset !== 'string' || typeof limit !== 'string') {
    throw ErrorUtils.unprocessableError('devem ser passadas as querys "offset" e "limit"');
  } else if(isNaN(numberOffset) || isNaN(numberLimit)) {
    throw ErrorUtils.unprocessableError('as querys "offset" e "limit" devem ser números');
  } else if(numberOffset % 1 !== 0 || numberLimit % 1 !== 0) {
    throw ErrorUtils.unprocessableError('as querys "offset" e "limit" devem ser inteiros');
  }

  res.locals.offset = numberOffset;
  res.locals.limit = numberLimit;

  next();
}

export default paginationQueryMiddleware;