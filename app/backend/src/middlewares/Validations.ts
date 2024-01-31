import { Request, Response, NextFunction } from 'express';
import joiValidateLogin from '../utils/joi/login';

export default class Validations {
  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { error } = joiValidateLogin(req.body);

    if (error) return res.status(400).json({ message: 'Invalid Data' });

    next();
  }
}
