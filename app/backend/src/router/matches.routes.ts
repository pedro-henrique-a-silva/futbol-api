import { Request, Response, Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.getAllTeams(req, res),
);

export default router;
