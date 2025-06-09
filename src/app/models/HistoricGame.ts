import { Game } from './Game';
import { ScoreTeam } from './ScoreTeam';

export class HistoricGame extends Game {
  saveDate: Date;

  /**
   *
   */
  constructor(home: ScoreTeam, away: ScoreTeam) {
    super(home, away);
    this.saveDate = new Date();
  }
}
