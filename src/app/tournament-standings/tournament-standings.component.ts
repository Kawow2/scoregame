import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeft,
  heroPlay,
  heroTrash,
  heroTrophy,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { TournamentService } from '../../services/tournament.service';
import { TournamentTeam } from '../models/tournament/TournamentTeam';

@Component({
  selector: 'app-tournament-standings',
  imports: [NgIcon],
  providers: [provideIcons({ heroTrophy, heroPlay, heroXMark, heroArrowLeft, heroTrash })],
  templateUrl: './tournament-standings.component.html',
})
export class TournamentStandingsComponent implements OnInit {
  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);

  readonly tournament = this.tournamentService.tournament;
  readonly rankedTeams = this.tournamentService.rankedTeams;

  readonly teams = computed(() => this.tournament()?.teams ?? []);
  readonly gameHistory = computed(() => this.tournament()?.gameHistory ?? []);
  readonly pointsConfig = computed(() => this.tournament()?.pointsConfig);

  selectingGame = signal(false);
  selectedHomeId = signal('');
  selectedAwayId = signal('');
  gameSelectError = signal('');

  showDeleteConfirm = signal(false);

  ngOnInit(): void {
    if (!this.tournament()) {
      this.router.navigate(['/']);
    }
  }

  rankLabel(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}`;
  }

  goBack(): void {
    this.tournamentService.clearActiveTournament();
    this.router.navigate(['/']);
  }

  openGameSelect(): void {
    this.selectedHomeId.set('');
    this.selectedAwayId.set('');
    this.gameSelectError.set('');
    this.selectingGame.set(true);
  }

  cancelGameSelect(): void {
    this.selectingGame.set(false);
  }

  launchGame(): void {
    const homeId = this.selectedHomeId();
    const awayId = this.selectedAwayId();

    if (!homeId || !awayId) {
      this.gameSelectError.set('Please select both teams.');
      return;
    }
    if (homeId === awayId) {
      this.gameSelectError.set('Home and away teams must be different.');
      return;
    }

    this.tournamentService.startGame(homeId, awayId);
    this.router.navigate(['/game']);
  }

  confirmDelete(): void {
    this.showDeleteConfirm.set(true);
  }

  cancelDelete(): void {
    this.showDeleteConfirm.set(false);
  }

  doDelete(): void {
    const id = this.tournament()?.id;
    if (id) {
      this.tournamentService.deleteTournament(id);
    }
    this.router.navigate(['/']);
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString();
  }

  availableAwayTeams(allTeams: TournamentTeam[]): TournamentTeam[] {
    return allTeams.filter(t => t.id !== this.selectedHomeId());
  }

  availableHomeTeams(allTeams: TournamentTeam[]): TournamentTeam[] {
    return allTeams.filter(t => t.id !== this.selectedAwayId());
  }
}
