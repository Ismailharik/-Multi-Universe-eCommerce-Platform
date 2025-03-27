import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent {
  @Input() date: string | undefined;

  public timerdate: number = 0;
  public now: number = 0;

  constructor() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  }

  ngOnInit(): void {
    if (this.date) {
      this.timerdate = Math.trunc(new Date(this.date).getTime() / 1000);
      this.now = Math.trunc(new Date().getTime() / 1000);
    }
  }

  get seconds() {
    return Math.max((this.timerdate - this.now) % 60, 0);
  }

  get minutes() {
    return Math.max(Math.trunc((this.timerdate - this.now) / 60) % 60, 0);
  }

  get hours() {
    return Math.max(Math.trunc((this.timerdate - this.now) / 60 / 60) % 24, 0);
  }

  get days() {
    return Math.max(Math.trunc((this.timerdate - this.now) / 60 / 60 / 24), 0);
  }
}
