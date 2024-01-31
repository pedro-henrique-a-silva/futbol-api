import { Request, Response, NextFunction } from 'express';
import joiValidateLogin from '../utils/joi/login';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class Validations {
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { error } = joiValidateLogin(req.body);

    if (error) {
      const [status, message] = error.message.split('|');
      return res.status(mapStatusHTTP(status)).json({ message });
    }

    next();
  }
}
