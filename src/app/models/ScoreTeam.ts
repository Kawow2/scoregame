import { Team } from './Team';

export class ScoreTeam {
  score: number = 0;
  team: Team;

  constructor() {
    this.team = new Team('Unnamed Team');
    this.score = 0;
  }
}
