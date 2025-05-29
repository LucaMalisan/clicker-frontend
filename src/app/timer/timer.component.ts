import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {Router} from "@angular/router";

/**
 * This class handles the timer component
 */

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

    //client side interval for timer
    protected intervalId: any;

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {

            // sync timer with server - e.g. used on page refresh
            this.coreService.sendData("get-remaining-duration", sessionStorage.getItem("session-key"),
                    (duration: string) => this.startTimer(parseInt(duration)));

            //server informs that session should be stopped
            this.coreService.listen("stop-session", () => {
                console.log("stop-session");
                clearInterval(this.intervalId);

                // redirect to end screen
                location.href = "/end-leaderboard";
            });
        });
    }

    // variables used for timer component
    protected durationInMs: number;
    public hours: number;
    public minutes: number;
    public seconds: number;

    protected startTimer(durationInMs: number): void {
        this.durationInMs = durationInMs;
        let deadline = Date.now() + this.durationInMs;

        // refresh timer each second for the given time
        this.intervalId = setInterval(() => this.refreshTime(deadline), 1000);
    }

    protected refreshTime(deadlineInMillis: number) {

        // how long until deadline?
        let diff = deadlineInMillis - Date.now();

        // split diff into hours, minutes and seconds
        this.hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        this.minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
        this.seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

        // calculate progress bar for give remaining time
        this.progress(diff);
    }

    protected progress(timeLeft: number): void {
        let element = document.getElementById("progressBar") as HTMLElement;

        // calculate with of progress bar by time left and set it
        let progressBarWidth = timeLeft * element.clientWidth / this.durationInMs;
        element.querySelector('div').style.width = `${progressBarWidth}px`;
    };
}
