import { Routes } from '@angular/router';
import { TournamentGameComponent } from './tournament-game/tournament-game.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentSetupComponent } from './tournament-setup/tournament-setup.component';
import { TournamentStandingsComponent } from './tournament-standings/tournament-standings.component';

export const routes: Routes = [
  { path: '', component: TournamentListComponent },
  { path: 'setup', component: TournamentSetupComponent },
  { path: 'standings', component: TournamentStandingsComponent },
  { path: 'game', component: TournamentGameComponent },
];
