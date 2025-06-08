import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class TimerComponent {
  minutes: number = 0;
  seconds: number = 0;
  timeLeft: number = 0; // en secondes
  isRunning: boolean = false;
  interval: any;

  setTime() {
    this.timeLeft = this.minutes * 60 + this.seconds;
    this.stop(); // on arrête au cas où le timer tourne
  }

  start() {
    if (this.timeLeft <= 0 || this.isRunning) return;
    this.isRunning = true;

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
    this.isRunning = false;
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
}
