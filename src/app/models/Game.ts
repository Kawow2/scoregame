import { ScoreTeam } from './ScoreTeam';

export class Game {
  /**
   *
   */
  constructor(home: ScoreTeam, away: ScoreTeam) {
    this.homeTeam = home;
    this.awayTeam = away;
  }

  awayTeam: ScoreTeam;
  homeTeam: ScoreTeam;
}
