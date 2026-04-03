import { PointsConfig } from './PointsConfig';
import { TournamentGameResult } from './TournamentGameResult';
import { TournamentTeam } from './TournamentTeam';

export interface Tournament {
  id: string;
  name: string;
  teams: TournamentTeam[];
  pointsConfig: PointsConfig;
  gameHistory: TournamentGameResult[];
}
