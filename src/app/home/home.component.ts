import { Component } from '@angular/core';
import { CurrentGameComponent } from '../current-game/current-game.component';
import { GameActionsButtonsComponent } from '../game-actions-buttons/game-actions-buttons.component';
import { ScoreTeam } from '../models/ScoreTeam';
import { Team } from '../models/Team';
import { TimerComponent } from '../timer/timer.component';
import { GamesService } from '../../services/games.service';
import { log } from 'console';
import { Game } from '../models/Game';
import { HistoricGame } from '../models/HistoricGame';

@Component({
  selector: 'app-home',
  imports: [CurrentGameComponent, GameActionsButtonsComponent, TimerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  /**
   *
   */
  constructor(private readonly gameService: GamesService) {}
  homeTeam = new ScoreTeam();
  awayTeam = new ScoreTeam();

  resetGame() {
    this.homeTeam = new ScoreTeam();
    this.awayTeam = new ScoreTeam();
  }

  saveGame() {
    const game = new HistoricGame(this.homeTeam, this.awayTeam);
    this.gameService.save(game);
  }

  showHistoric() {
    let historicalGames = this.gameService.getHistoric();
  }

  updateTimer() {
    //TODO
  }
}
