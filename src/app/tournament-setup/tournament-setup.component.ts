import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft, heroPlusCircle, heroXMark } from '@ng-icons/heroicons/outline';
import { TournamentService } from '../../services/tournament.service';
import { PointsConfig } from '../models/tournament/PointsConfig';

@Component({
  selector: 'app-tournament-setup',
  imports: [FormsModule, NgIcon],
  providers: [provideIcons({ heroPlusCircle, heroXMark, heroArrowLeft })],
  templateUrl: './tournament-setup.component.html',
})
export class TournamentSetupComponent {
  tournamentName = '';
  teamNames: string[] = ['', '', ''];
  winPoints = 3;
  lossPoints = 0;
  drawPoints = 1;
  errorMessage = '';

  constructor(
    private readonly tournamentService: TournamentService,
    private readonly router: Router,
  ) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  addTeam(): void {
    this.teamNames.push('');
  }

  removeTeam(index: number): void {
    if (this.teamNames.length > 3) {
      this.teamNames.splice(index, 1);
    }
  }

  create(): void {
    this.errorMessage = '';

    if (!this.tournamentName.trim()) {
      this.errorMessage = 'Please enter a tournament name.';
      return;
    }

    const filledNames = this.teamNames.map(n => n.trim()).filter(n => n.length > 0);
    if (filledNames.length < 3) {
      this.errorMessage = 'Please enter at least 3 team names.';
      return;
    }

    const uniqueNames = new Set(filledNames.map(n => n.toLowerCase()));
    if (uniqueNames.size !== filledNames.length) {
      this.errorMessage = 'Team names must be unique.';
      return;
    }

    const pointsConfig: PointsConfig = {
      win: this.winPoints,
      loss: this.lossPoints,
      draw: this.drawPoints,
    };

    this.tournamentService.createTournament(this.tournamentName.trim(), filledNames, pointsConfig);
    this.router.navigate(['/standings']);
  }
}
