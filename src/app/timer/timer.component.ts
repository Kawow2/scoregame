import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../shared/icons.module';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  imports: [FormsModule, IconsModule, NgIcon],
})
export class TimerComponent {
  minutes: number = 0;
  seconds: number = 0;
  timeLeft: number = 0; // en secondes
  isRunning = signal(false); // Utilisation de signal pour suivre l'état du timer
  interval: any;

  setTime() {
    this.timeLeft = this.minutes * 60 + this.seconds;
    this.stop(); // on arrête au cas où le timer tourne
  }

  start() {
    if (this.timeLeft <= 0 || this.isRunning()) return;
    this.isRunning.set(true);

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.isRunning.set(false);
  }

  reset() {
    this.stop();
    this.timeLeft = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  get displayMinutes(): string {
    return Math.floor(this.timeLeft / 60)
      .toString()
      .padStart(2, '0');
  }

  get displaySeconds(): string {
    return (this.timeLeft % 60).toString().padStart(2, '0');
  }

  addMinutes(value: number = 1) {
    this.minutes += value;
    this.checkTimeIntegrity();
  }

  addSeconds(value: number = 1) {
    this.seconds += value;
    this.checkTimeIntegrity();
  }

  checkTimeIntegrity() {
    if (this.minutes < 0) {
      this.minutes = 0;
    }
    if (this.seconds < 0) {
      this.seconds = 59;
    }
    if (this.seconds >= 60) {
      this.minutes += Math.floor(this.seconds / 60);
      this.seconds = this.seconds % 60;
    }
    this.setTime();
  }
}
