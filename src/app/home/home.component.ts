import { Component } from '@angular/core';
import { CurrentGameComponent } from '../current-game/current-game.component';
import { GameActionsButtonsComponent } from '../game-actions-buttons/game-actions-buttons.component';
import { ScoreTeam } from '../models/ScoreTeam';
import { Team } from '../models/Team';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-home',
  imports: [CurrentGameComponent, GameActionsButtonsComponent, TimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  homeTeam = new ScoreTeam();
  awayTeam = new ScoreTeam();

  resetGame() {
    this.homeTeam = new ScoreTeam();
    this.awayTeam = new ScoreTeam();
  }

  saveGame() {
    //TODO
  }

  showHistoric() {
    //TODO
  }

  updateTimer() {
    //TODO
  }
}
