import { Component, Input } from '@angular/core';
import { ScoreTeam } from '../models/ScoreTeam';
import { ScoreActionButtonComponent } from '../score-action-button/score-action-button.component';

@Component({
  selector: 'app-score',
  imports: [ScoreActionButtonComponent],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  @Input() reverseButtons: boolean = false;

  get orderedButtons(): number[] {
    const values = [1, 2, 3, -1];
    return this.reverseButtons ? [...values].reverse() : values;
  }
  @Input() team: ScoreTeam = {
    score: 0,
    team: {
      name: 'Home Team',
    },
  };
  // @Input() awayTeam: ScoreTeam;
}
