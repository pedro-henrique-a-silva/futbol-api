import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/users', usersRouter);

export default router;
