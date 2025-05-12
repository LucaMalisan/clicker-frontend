import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";

interface ILeaderBoardEntry {
    userName: string,
    points: number
}

@Component({
    selector: 'app-leaderboard',
    imports: [],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.css'
})

export class LeaderboardComponent implements OnInit {

    protected leaderboard: ILeaderBoardEntry[];

    constructor(protected coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.listen("leaderboard", (leaderboard: string) => {
                this.leaderboard = JSON.parse(leaderboard);
            });
        });
    }
}
