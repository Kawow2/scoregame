import { Injectable } from '@angular/core';
import { Game } from '../app/models/Game';
import { LocalstorageService } from './localstorage.service';
import { HistoricGame } from '../app/models/HistoricGame';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private readonly localStorageService: LocalstorageService) {}

  gamesHistoricKey = 'historicGames';

  save(game: Game) {
    this.localStorageService.addItemToList(this.gamesHistoricKey, game);
  }

  reset() {
    this.localStorageService.clear();
  }

  getHistoric(): HistoricGame[] {
    return this.localStorageService.getList(this.gamesHistoricKey);
  }
}
