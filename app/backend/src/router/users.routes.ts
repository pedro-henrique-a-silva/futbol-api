import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import UsersController from '../controller/UsersController';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);

export default router;
