import { Component, Input } from '@angular/core';
import { ScoreTeam } from '../models/ScoreTeam';
import { Team } from '../models/Team';
import { log } from 'console';

@Component({
  selector: 'app-score-action-button',
  imports: [],
  templateUrl: './score-action-button.component.html',
  styleUrl: './score-action-button.component.css',
})
export class ScoreActionButtonComponent {
  @Input() label: string = '';
  @Input() changeScoreValue: number = 0;
  @Input() scoreTeam: ScoreTeam = {} as ScoreTeam;

  changeScore() {
    console.log(
      `Changing score for team: ${this.scoreTeam.team.name} by ${this.changeScoreValue}`
    );

    this.scoreTeam.score += this.changeScoreValue;
  }
}
