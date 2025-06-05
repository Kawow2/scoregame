import { Component, Input } from '@angular/core';
import { ScoreTeam } from '../models/ScoreTeam';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-current-game',
  imports: [ScoreComponent],
  templateUrl: './current-game.component.html',
  styleUrl: './current-game.component.css',
})
export class CurrentGameComponent {
  @Input() awayTeam!: ScoreTeam;
  @Input() homeTeam!: ScoreTeam;
}
