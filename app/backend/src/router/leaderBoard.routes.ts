import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.getHomeLeaderBoard(req, res),
);

export default router;
