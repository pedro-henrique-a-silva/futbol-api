import { IGamesStatistics,
  ILeaderBoard } from '../Interfaces/leaderBoard/ILeaderBoard';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

export default class LeaderBoardService {
  private leaderBoard: Record<number, Record<string, number>> = {};
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamsModel: ITeamsModel = new TeamsModel(),
  ) {}

  public async getHomeLeaderBoard(): Promise<ILeaderBoard[]> {
    const goalsStatistics = await this.teamsModel.getGolsStatistics('home');
    const gamesStatistics = await this.teamsModel.getGamesStatistics('home');

    const leaderBoard = gamesStatistics.map((match) => {
      const goalSData = goalsStatistics.find((goals) => goals.name === match.name);
      return {
        ...match,
        goalsOwn: goalSData?.goalsOwn ?? 0,
        goalsFavor: goalSData?.goalsFavor ?? 0,
        goalsBalance: ((goalSData?.goalsFavor ?? 0) - (goalSData?.goalsOwn ?? 0)),
        totalPoints: (match.totalVictories * 3) + match.totalDraws,
        efficiency: LeaderBoardService.getEfficiency(match),
      };
    });
    return LeaderBoardService.sortLeaderBoard(leaderBoard);
  }

  private static sortLeaderBoard(leaderBoard: ILeaderBoard[]): ILeaderBoard[] {
    return leaderBoard.sort((a, b) => {
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance === b.goalsBalance) {
          return b.goalsFavor - a.goalsFavor;
        }
        return b.goalsBalance - a.goalsBalance;
      }
      return b.totalPoints - a.totalPoints;
    });
  }

  private static getEfficiency(match: IGamesStatistics): string {
    return ((((match.totalVictories * 3) + match.totalDraws) / (match.totalGames * 3)) * 100)
      .toFixed(2);
  }
}
