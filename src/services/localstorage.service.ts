import { Injectable } from '@angular/core';
import { Game } from '../app/models/Game';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  historicalGamesKey = 'historicalGames';
  constructor() {}

  clear() {
    localStorage.clear();
  }

  addItemToList<T>(key: string, item: T) {
    var value = localStorage.getItem(key);
    if (!value) {
      localStorage.setItem(key, JSON.stringify([item]));
      return;
    }
    var list = JSON.parse(value) as T[];
    list.push(item);
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(list));
  }

  getList<T>(key: string): T[] {
    let values = localStorage.getItem(key);
    if (!values) {
      throw new Error('values not found');
    }
    return JSON.parse(values) as T[];
  }
}
