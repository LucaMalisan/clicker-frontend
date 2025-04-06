import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgForOf} from "@angular/common";
import {GamePointsModule} from "../game-points/game-points.module";

interface IEffect {
    name: string,
    description: string,
    cost: string,
    route: string,
    icon: string
}

@Component({
    selector: 'app-shop-preview',
    imports: [
        NgForOf
    ],
    templateUrl: './shop-preview.component.html',
    styleUrl: './shop-preview.component.css'
})
export class ShopPreviewComponent implements OnInit {

    protected effects: IEffect[] = [];
    protected updateInProgress = false;

    constructor(protected coreService: CoreService,
                protected gamePoints: GamePointsModule
    ) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
                    this.coreService.sendData("get-effects", "", (effects: string) => {
                        console.log("effects: " + effects);
                        let json = JSON.parse(effects);
                        json.forEach((e: IEffect) => this.effects.push(e));
                    });
                }
        );
    }

    handleEffectClick(effect: IEffect) {
        this.gamePoints.stopListening();

        if (!this.updateInProgress && this.coreService.points >= parseInt(effect.cost)) {
            this.updateInProgress = true;
            this.coreService.points -= parseInt(effect.cost);

            this.coreService.sendData(effect.route, "", (updatedEffects: string) => {
                this.effects = JSON.parse(updatedEffects);
                this.updateInProgress = false;
                this.gamePoints.startListening()
            });
        }
    }

    protected readonly parseInt = parseInt;
}
