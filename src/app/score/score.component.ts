import { Component, Input } from '@angular/core';
import { ScoreTeam } from '../models/ScoreTeam';
import { ScoreActionsButtonsComponent } from '../score-actions-buttons/score-actions-buttons.component';
import { ScoreActionButtonComponent } from '../score-action-button/score-action-button.component';

@Component({
  selector: 'app-score',
  imports: [ScoreActionButtonComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  @Input() homeTeam: ScoreTeam = {
    score: 0,
    team: {
      name: 'Home Team',
    },
  };
  // @Input() awayTeam: ScoreTeam;
}
