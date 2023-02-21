
type CustomErrorTypes = (
  'not_found' | 'unauthorized' | 'conflict' | 'unprocessable'
);

export interface ICustomError {
  type: CustomErrorTypes;
  message: string | string[]
};

export class ErrorUtils {
  public static isCustomError(error: object) {
    return (error as ICustomError).type !== undefined;
  }
  
  public static getErrorStatusCode(type: CustomErrorTypes) {
    switch(type) {
      case 'not_found':
        return 404;
      case 'unauthorized':
        return 401;
      case 'conflict':
        return 409;
      case 'unprocessable':
        return 422;
    }
  }
  
  public static notFoundError(message: string | string[]): ICustomError {
    return { type: 'not_found', message };
  }
  
  public static unauthorizedError(message: string | string[]): ICustomError {
    return { type: 'unauthorized', message };
  }
  
  public static conflictError(message: string | string[]): ICustomError {
    return { type: 'conflict', message };
  }
  
  public static unprocessableError(message: string | string[]): ICustomError {
    return { type: 'unprocessable', message };
  }
}
