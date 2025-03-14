import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";

@Component({
    selector: 'app-timer',
    imports: [],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {

    constructor(protected coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData("ready-for-game-start", "");
            this.coreService.listen("start-timer", (duration: string) => this.startTimer(parseInt(duration)));
        });
    }

    protected totalDurationInMs: number;
    public hours: number;
    public minutes: number;
    public seconds: number;

    protected startTimer(durationMinutes: number): void {
        this.totalDurationInMs = durationMinutes * 60 * 1000;
        let deadline = Date.now() + this.totalDurationInMs;
        setInterval(() => this.refreshTime(deadline), 1000);
    }

    protected refreshTime(deadlineInMillis: number) {
        let diff = deadlineInMillis - Date.now();
        this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((diff % (1000 * 60)) / 1000);

        console.log(diff);
        this.progress(diff);
    }

    protected progress(timeLeft: number): void {
        let element = document.getElementById("progressBar") as HTMLElement;
        let progressBarWidth = timeLeft * element.clientWidth / this.totalDurationInMs;
        element.querySelector('div').style.width = `${progressBarWidth}px`;
    };
}
