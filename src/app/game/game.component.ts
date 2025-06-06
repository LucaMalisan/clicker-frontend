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
import {FpsCounterComponent} from "../fps-counter/fps-counter.component";

interface FloatingText {
    x: number;
    y: number;
}

interface IButtonClick {
    buttonClicks: number,
    hexCode: string
}

/**
 * This class handles the main game functionality.
 */

@Component({
    selector: 'app-game',
    imports: [NgFor, LeaderboardComponent, ShopPreviewComponent, TimerComponent, GamePointsModule, EffectLogComponent, NgOptimizedImage, ChatComponent, FpsCounterComponent],
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {

    // client-side cache for button clicks
    public newButtonClicks: number = 0;

    // array for the "+virus" animation
    public floatingTexts: FloatingText[] = [];

    // how many virus are gained per button click
    public virusAmountGained: number = 1;

    constructor(private coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {

            //send collected button clicks each 250 ms and clear cache
            setInterval(() => {
                if (this.newButtonClicks > 0) {

                    let clicks: IButtonClick = {
                        buttonClicks: this.newButtonClicks,
                        hexCode: localStorage.getItem("session-key")
                    };

                    this.coreService.sendData("handle-button-clicks", JSON.stringify(clicks));
                    this.newButtonClicks = 0;
                }
            }, 250);
        });
    }

    /**
     * Handle button click
     * @param event
     */
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

    /**
     * Notify server that player is offline.
     */
    @HostListener('window:beforeunload', ['$event'])
    notifyPlayerOffline() {
        this.coreService.sendData('player-offline', localStorage.getItem("session-key"));
    }
}
