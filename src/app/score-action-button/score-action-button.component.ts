import { Component, Input } from '@angular/core';
import { ScoreTeam } from '../models/ScoreTeam';

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

  updateScore() {
    this.scoreTeam.score += this.changeScoreValue;
  }
}
