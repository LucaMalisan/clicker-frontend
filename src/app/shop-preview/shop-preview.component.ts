import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgClass, NgForOf} from "@angular/common";
import {GamePointsModule} from "../game-points/game-points.module";

interface IEffect {
    name: string,
    description: string,
    cost: string,
    route: string,
    icon: string,
    disabled: boolean
}

/**
 * This class handles the effect shop
 */

@Component({
    selector: 'app-shop-preview',
    imports: [
        NgForOf,
        NgClass
    ],
    templateUrl: './shop-preview.component.html',
    styleUrl: './shop-preview.component.css'
})
export class ShopPreviewComponent implements OnInit {

    // cache for purchasable effects
    protected effects: IEffect[] = [];

    constructor(protected coreService: CoreService,
                protected gamePoints: GamePointsModule
    ) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {

                    // populate shop with all available effects
                    this.coreService.sendData("get-available-effects", "", (effects: string) => {
                        let json = JSON.parse(effects);
                        json.forEach((e: IEffect) => this.effects.push(e));
                    });

                    // server informs that effect can be reactivated - set it to enabled
                    this.coreService.listen("reactivate-effect", (effectName: string) => {
                        this.setEffectDisabled(effectName, false)
                    });

                    // client is influenced by popupinator effect - server informs that client should popup
                    this.coreService.listen("show-popup", () => {
                        alert("!!!YOUR PC IS INFECTED BY 934944534458394 VIRUSES!!!")
                    });
                }
        );
    }

    handleEffectClick(effect: IEffect) {
        this.gamePoints.stopListening();

        // fallback check if user has enough points (user might have manually enabled effect button)
        if (this.coreService.points >= parseInt(effect.cost)) {

            // set disabled until reactivate-effect event
            this.setEffectDisabled(effect.name, true);

            this.coreService.points -= parseInt(effect.cost);

            // generic logic to inform server that effect should be activated
            this.coreService.sendData(effect.route, localStorage.getItem("session-key"), (updatedEffects: string) => {
                // update available effects
                this.effects = JSON.parse(updatedEffects);

                //keep enabled / disabled status
                this.setEffectDisabled(effect.name, effect.disabled)
                this.gamePoints.startListening();
            });
        }
    }

    // search effect by name and set disabled flag
    protected setEffectDisabled(effectName: string, disabled: boolean) {
        this.effects.filter(e => e.name === effectName).forEach(e => e.disabled = disabled);
    }

    protected readonly parseInt = parseInt;
}
