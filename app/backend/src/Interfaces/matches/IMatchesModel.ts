import { ICRUDModelReader } from '../ICRUDModel';
import { IMatch } from './IMatches';

export type IMatchesModel = Omit<ICRUDModelReader<IMatch>, 'findById'> & {
  findAllInProgress(inProgress: string): Promise<IMatch[]>;
  finishMatch(id: string): Promise<void>;
};
