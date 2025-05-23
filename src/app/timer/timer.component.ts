import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-timer',
    imports: [],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {

    constructor(protected coreService: CoreService,
                protected router: Router) {
    }

    protected intervalId: any;

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData("get-remaining-duration", sessionStorage.getItem("session-key"),
                    (duration: string) => this.startTimer(parseInt(duration)));
            this.coreService.listen("stop-session", () => {
                console.log("stop-session");
                clearInterval(this.intervalId);
                this.router.navigate(["end-leaderboard"])
            });
        });
    }

    protected durationInMs: number;
    public hours: number;
    public minutes: number;
    public seconds: number;

    protected startTimer(durationInMs: number): void {
        this.durationInMs = durationInMs;
        let deadline = Date.now() + this.durationInMs;
        this.intervalId = setInterval(() => this.refreshTime(deadline), 1000);
    }

    protected refreshTime(deadlineInMillis: number) {
        let diff = deadlineInMillis - Date.now();
        this.hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));
        this.progress(diff);
    }

    protected progress(timeLeft: number): void {
        let element = document.getElementById("progressBar") as HTMLElement;
        let progressBarWidth = timeLeft * element.clientWidth / this.durationInMs;
        element.querySelector('div').style.width = `${progressBarWidth}px`;
    };
}
