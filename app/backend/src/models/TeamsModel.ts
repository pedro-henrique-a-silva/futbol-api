import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  public async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
