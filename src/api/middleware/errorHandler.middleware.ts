import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes'
import ApiError from '../api-error';
import {type IError} from '../api-error';

class ErrorHandler {
  static addErrorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
    if (err) {
      const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR
      const body: IError | string = {
        status,
        name: err.name,
        message: err.message || 'An error occurred during the request.',
        fields: err.fields,
      }
      res.status(status)
      res.send(body)
    }
    next()
  }
}

export default ErrorHandler;
