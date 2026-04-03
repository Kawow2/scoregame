import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroCheckCircle } from '@ng-icons/heroicons/outline';
import { TournamentService } from '../../services/tournament.service';
import { ScoreTeam } from '../models/ScoreTeam';
import { ScoreComponent } from '../score/score.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-tournament-game',
  imports: [ScoreComponent, TimerComponent, NgIcon],
  providers: [provideIcons({ heroArrowLeft, heroCheckCircle })],
  templateUrl: './tournament-game.component.html',
})
export class TournamentGameComponent implements OnInit {
  homeTeam: ScoreTeam = new ScoreTeam();
  awayTeam: ScoreTeam = new ScoreTeam();
  homeTeamId = '';
  awayTeamId = '';
  showEndConfirm = false;

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const pending = this.tournamentService.pendingGame();
    if (!pending) {
      this.router.navigate(['/standings']);
      return;
    }

    const home = this.tournamentService.getTeam(pending.homeId);
    const away = this.tournamentService.getTeam(pending.awayId);

    if (!home || !away) {
      this.router.navigate(['/standings']);
      return;
    }

    this.homeTeamId = home.id;
    this.awayTeamId = away.id;

    this.homeTeam = new ScoreTeam();
    this.homeTeam.team.name = home.name;

    this.awayTeam = new ScoreTeam();
    this.awayTeam.team.name = away.name;
  }

  confirmEnd(): void {
    this.showEndConfirm = true;
  }

  cancelEnd(): void {
    this.showEndConfirm = false;
  }

  endGame(): void {
    this.tournamentService.endGame(
      this.homeTeamId,
      this.awayTeamId,
      this.homeTeam.score,
      this.awayTeam.score,
    );
    this.router.navigate(['/standings']);
  }

  goBack(): void {
    this.tournamentService.cancelPendingGame();
    this.router.navigate(['/standings']);
  }
}
