import { Component } from '@angular/core';
import { CurrentGameComponent } from '../current-game/current-game.component';
import { GameActionsButtonsComponent } from '../game-actions-buttons/game-actions-buttons.component';
import { ScoreTeam } from '../models/ScoreTeam';
import { TimerComponent } from '../timer/timer.component';
import { GamesService } from '../../services/games.service';
import { HistoricGame } from '../models/HistoricGame';
import { IconsModule } from '../shared/icons.module';

@Component({
  selector: 'app-home',
  imports: [
    CurrentGameComponent,
    GameActionsButtonsComponent,
    TimerComponent,
    IconsModule,
  ],
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
}
