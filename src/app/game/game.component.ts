import {Component, OnInit, ViewChild} from '@angular/core';
import {NgFor} from '@angular/common';
import {LeaderboardComponent} from '../leaderboard/leaderboard.component';
import {ShopPreviewComponent} from '../shop-preview/shop-preview.component';
import {TimerComponent} from "../timer/timer.component";
import {CoreService} from "../core.service";
import {Router} from "@angular/router";
import {GamePointsModule} from "../game-points/game-points.module";

interface FloatingText {
    x: number;
    y: number;
}

interface ISessionInfo {
    sessionKey: string,
    joinedPlayers: any[]
    admin: boolean
}

@Component({
    selector: 'app-game',
    imports: [NgFor, LeaderboardComponent, ShopPreviewComponent, TimerComponent, GamePointsModule],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

    public username: string = "H4ckerman";
    public newButtonClicks: number = 0;
    public floatingTexts: FloatingText[] = [];
    public virusAmountGained: number = 1;

    constructor(protected coreService: CoreService,
                private router: Router) {
    }

    @ViewChild(GamePointsModule) gamePoints!: GamePointsModule;

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData("get-session-info", "", (sessionInfo: string) => {
                let json: ISessionInfo = JSON.parse(sessionInfo);

                if (!json.sessionKey) {
                    this.router.navigate(["session-joining"])
                }
            });

            setInterval(() => {
                if (this.newButtonClicks > 0) {
                    this.coreService.sendData("handle-button-clicks", this.newButtonClicks + "");
                    this.newButtonClicks = 0;
                }
            }, 250);
        })
    }

    addVirus(event: MouseEvent) {
        this.newButtonClicks++;

        // Get button position for floating text
        const button = event.target as HTMLElement;
        const rect = button.getBoundingClientRect();

        // Generate random offset near the button for floating text
        const randomX = rect.left + rect.width / 2 + (Math.random() * 200 - 150);
        const randomY = rect.top + rect.height / 2 + (Math.random() * 100 - 50);

        const newText: FloatingText = {x: randomX, y: randomY};
        this.floatingTexts.push(newText);

        setTimeout(() => {
            this.floatingTexts.shift();
        }, 2000);
    }
}
