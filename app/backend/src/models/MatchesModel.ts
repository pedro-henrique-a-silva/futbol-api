import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import { IMatch } from '../Interfaces/matches/IMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeams, attributes: ['teamName'], as: 'homeTeam' },
        { model: SequelizeTeams, attributes: ['teamName'], as: 'awayTeam' },
      ],
    });
    return matches.map((match) => match.dataValues);
  }
}
