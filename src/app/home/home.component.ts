import { Component } from '@angular/core';
import { CurrentGameComponent } from '../current-game/current-game.component';
import { GameActionsButtonsComponent } from '../game-actions-buttons/game-actions-buttons.component';
import { ScoreTeam } from '../models/ScoreTeam';
import { Team } from '../models/Team';

@Component({
  selector: 'app-home',
  imports: [CurrentGameComponent, GameActionsButtonsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  spurs: ScoreTeam = {
    score: 0,
    team: {
      name: 'Spurs',
    } as Team,
  };

  boston: ScoreTeam = {
    score: 0,
    team: {
      name: 'Boston',
    } as Team,
  };
}
