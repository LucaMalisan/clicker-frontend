import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {Router, RouterLink} from "@angular/router";

interface ILeaderBoardEntry {
    userName: string,
    points: number
}

/**
 * This class handles the end leaderboard functionality.
 */

@Component({
    selector: 'app-end-leaderboard',
    imports: [
        RouterLink
    ],
    templateUrl: './end-leaderboard.component.html',
    styleUrl: './end-leaderboard.component.css'
})
export class EndLeaderboardComponent implements OnInit {

    protected leaderboard: ILeaderBoardEntry[] = [];

    constructor(protected coreService: CoreService,
                protected router: Router) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            // get end leaderboard from server
            this.coreService.sendData("end-leaderboard", localStorage.getItem("session-key"), (leaderboard: string) => {
                this.leaderboard = JSON.parse(leaderboard);
            });
        });
    }
}
