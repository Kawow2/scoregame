import { computed, Injectable, signal } from '@angular/core';
import { Tournament } from '../app/models/tournament/Tournament';
import { TournamentGameResult } from '../app/models/tournament/TournamentGameResult';
import { TournamentTeam } from '../app/models/tournament/TournamentTeam';
import { PointsConfig } from '../app/models/tournament/PointsConfig';

const STORAGE_KEY = 'scoregame_tournaments';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private _tournaments = signal<Tournament[]>(this.loadFromStorage());
  private _activeTournamentId = signal<string | null>(null);
  private _pendingGame = signal<{ homeId: string; awayId: string } | null>(null);

  readonly tournaments = this._tournaments.asReadonly();
  readonly pendingGame = this._pendingGame.asReadonly();

  readonly tournament = computed<Tournament | null>(() => {
    const id = this._activeTournamentId();
    if (!id) return null;
    return this._tournaments().find(t => t.id === id) ?? null;
  });

  readonly rankedTeams = computed<TournamentTeam[]>(() => {
    const t = this.tournament();
    if (!t) return [];
    return [...t.teams].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.name.localeCompare(b.name);
    });
  });

  selectTournament(id: string): void {
    this._activeTournamentId.set(id);
  }

  createTournament(name: string, teamNames: string[], pointsConfig: PointsConfig): void {
    const teams: TournamentTeam[] = teamNames.map((n, i) => ({
      id: `team-${i}-${Date.now()}`,
      name: n.trim(),
      points: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      gamesPlayed: 0,
    }));
    const newTournament: Tournament = {
      id: `t-${Date.now()}`,
      name,
      teams,
      pointsConfig,
      gameHistory: [],
    };
    this._tournaments.update(list => [...list, newTournament]);
    this._activeTournamentId.set(newTournament.id);
    this.persist();
  }

  startGame(homeId: string, awayId: string): void {
    this._pendingGame.set({ homeId, awayId });
  }

  endGame(homeId: string, awayId: string, homeScore: number, awayScore: number): void {
    const t = this.tournament();
    if (!t) return;

    const homeTeam = t.teams.find(x => x.id === homeId);
    const awayTeam = t.teams.find(x => x.id === awayId);
    if (!homeTeam || !awayTeam) return;

    const result: TournamentGameResult = {
      id: `g-${Date.now()}`,
      homeTeamId: homeId,
      awayTeamId: awayId,
      homeTeamName: homeTeam.name,
      awayTeamName: awayTeam.name,
      homeScore,
      awayScore,
      date: new Date().toISOString(),
    };

    const { win: winPts, loss: lossPts, draw: drawPts } = t.pointsConfig;

    const updatedTeams = t.teams.map(team => {
      if (team.id !== homeId && team.id !== awayId) return team;
      const isHome = team.id === homeId;
      const myScore = isHome ? homeScore : awayScore;
      const oppScore = isHome ? awayScore : homeScore;
      const win = myScore > oppScore;
      const draw = myScore === oppScore;
      return {
        ...team,
        gamesPlayed: team.gamesPlayed + 1,
        wins: team.wins + (win ? 1 : 0),
        losses: team.losses + (!win && !draw ? 1 : 0),
        draws: team.draws + (draw ? 1 : 0),
        points: team.points + (win ? winPts : draw ? drawPts : lossPts),
      };
    });

    const updated = { ...t, teams: updatedTeams, gameHistory: [result, ...t.gameHistory] };
    this._tournaments.update(list => list.map(x => (x.id === t.id ? updated : x)));
    this._pendingGame.set(null);
    this.persist();
  }

  cancelPendingGame(): void {
    this._pendingGame.set(null);
  }

  deleteTournament(id: string): void {
    this._tournaments.update(list => list.filter(t => t.id !== id));
    if (this._activeTournamentId() === id) {
      this._activeTournamentId.set(null);
    }
    this.persist();
  }

  clearActiveTournament(): void {
    this._activeTournamentId.set(null);
    this._pendingGame.set(null);
  }

  getTeam(id: string): TournamentTeam | undefined {
    return this.tournament()?.teams.find(t => t.id === id);
  }

  private loadFromStorage(): Tournament[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Tournament[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tournaments()));
  }
}
