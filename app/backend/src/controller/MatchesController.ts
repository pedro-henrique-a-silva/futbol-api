import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchesService.getAllMatches();

    const code = mapStatusHTTP(status);

    return res.status(code).json(data);
  }
}
