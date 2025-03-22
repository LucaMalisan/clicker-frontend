import {NgFor} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";

interface ILeaderBoardEntry {
    userName: string,
    points: number
}

@Component({
    selector: 'app-leaderboard',
    imports: [NgFor],
    templateUrl: './leaderboard.component.html',
    styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent implements OnInit {

    protected leaderboard: ILeaderBoardEntry[];

    constructor(protected coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.listen("leaderboard", (leaderboard: string) => {
            this.leaderboard = JSON.parse(leaderboard);
        })
    }
}
