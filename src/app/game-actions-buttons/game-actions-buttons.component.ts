import { Component, output, Output } from '@angular/core';

@Component({
  selector: 'app-game-actions-buttons',
  imports: [],
  templateUrl: './game-actions-buttons.component.html',
  styleUrl: './game-actions-buttons.component.css',
})
export class GameActionsButtonsComponent {
  onGameReset = output<void>();
  onSaveGame = output<void>();
  onShowHistoric = output<void>();
  onUpdateTimer = output<void>();

  resetGame() {
    this.onGameReset.emit();
  }

  saveGame() {
    this.onSaveGame.emit();
  }

  showHistoric() {
    this.onShowHistoric.emit();
  }

  updateTimer() {
    this.onUpdateTimer.emit();
  }
}
