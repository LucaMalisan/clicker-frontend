import {Component, HostListener, OnInit} from '@angular/core';
import {NgFor, NgOptimizedImage} from '@angular/common';
import {LeaderboardComponent} from '../leaderboard/leaderboard.component';
import {ShopPreviewComponent} from '../shop-preview/shop-preview.component';
import {TimerComponent} from "../timer/timer.component";
import {CoreService} from "../core.service";
import {Router} from "@angular/router";
import {GamePointsModule} from "../game-points/game-points.module";
import {EffectLogComponent} from "../effect-log/effect-log.component";
import {ChatComponent} from "../chat/chat.component";

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
    imports: [NgFor, LeaderboardComponent, ShopPreviewComponent, TimerComponent, GamePointsModule, EffectLogComponent, NgOptimizedImage, ChatComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

    public newButtonClicks: number = 0;
    public floatingTexts: FloatingText[] = [];
    public virusAmountGained: number = 1;

    constructor(private coreService: CoreService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            setInterval(() => {
                if (this.newButtonClicks > 0) {
                    this.coreService.sendData("handle-button-clicks", this.newButtonClicks + "");
                    this.newButtonClicks = 0;
                }
            }, 250);
        });
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

    @HostListener('window:beforeunload', ['$event'])
    notifyPlayerOffline() {
        this.coreService.sendData('player-offline', localStorage.getItem("session-key"));
    }
}
