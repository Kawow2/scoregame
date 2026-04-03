import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPlusCircle,
  heroTrophy,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../models/tournament/Tournament';

@Component({
  selector: 'app-tournament-list',
  imports: [NgIcon],
  providers: [provideIcons({ heroPlusCircle, heroTrophy, heroTrash })],
  templateUrl: './tournament-list.component.html',
})
export class TournamentListComponent {
  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);

  readonly tournaments = this.tournamentService.tournaments;

  pendingDeleteId = signal<string | null>(null);

  openTournament(id: string): void {
    this.tournamentService.selectTournament(id);
    this.router.navigate(['/standings']);
  }

  newTournament(): void {
    this.router.navigate(['/setup']);
  }

  confirmDelete(id: string, event: Event): void {
    event.stopPropagation();
    this.pendingDeleteId.set(id);
  }

  cancelDelete(): void {
    this.pendingDeleteId.set(null);
  }

  doDelete(): void {
    const id = this.pendingDeleteId();
    if (id) {
      this.tournamentService.deleteTournament(id);
    }
    this.pendingDeleteId.set(null);
  }

  gamesPlayed(t: Tournament): number {
    return t.gameHistory.length;
  }

  leader(t: Tournament): string {
    if (!t.teams.length) return '';
    const sorted = [...t.teams].sort((a, b) => b.points - a.points);
    return sorted[0].name;
  }
}
