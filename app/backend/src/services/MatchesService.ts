import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(inProgress: string | null): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) {
      const matches = await this.matchesModel.findAllInProgress(inProgress);
      return { status: 'SUCCESSFUL', data: matches };
    }

    const matches = await this.matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }
}
