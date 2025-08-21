import {NextFunction, Request, Response} from 'express';
import ApiError from '../api-error';
import {StatusCodes} from 'http-status-codes';

class AuthMiddleware {
  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token || token !== 'valid-token') {
      throw new ApiError('Unauthorized', StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED');
    }
    // If authenticated, proceed to the next middleware or route handler
    res.locals['user'] = token;
    next();
  }
}

export default AuthMiddleware;
