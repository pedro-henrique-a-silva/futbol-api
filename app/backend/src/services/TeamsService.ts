import { ITeams } from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamsModel.findAll();

    return { status: 'SUCCESSFUL', data: teams };
  }
}
