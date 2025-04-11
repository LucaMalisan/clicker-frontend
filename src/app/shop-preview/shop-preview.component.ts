import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgForOf} from "@angular/common";
import {GamePointsModule} from "../game-points/game-points.module";

interface IEffect {
    name: string,
    description: string,
    cost: string,
    route: string,
    icon: string,
    disabled: boolean
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

    constructor(protected coreService: CoreService,
                protected gamePoints: GamePointsModule
    ) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
                    this.coreService.sendData("get-effects", "", (effects: string) => {
                        let json = JSON.parse(effects);
                        json.forEach((e: IEffect) => this.effects.push(e));
                    });

                    this.coreService.listen("reactivate-effect", (effectName: string) => {
                        this.setEffectDisabled(effectName, false)
                    });
                }
        );
    }

    handleEffectClick(effect: IEffect) {
        this.gamePoints.stopListening();

        if (this.coreService.points >= parseInt(effect.cost)) {
            this.setEffectDisabled(effect.name, true)
            this.coreService.points -= parseInt(effect.cost);

            this.coreService.sendData(effect.route, "", (updatedEffects: string) => {
                let disabled = effect.disabled;
                this.effects = JSON.parse(updatedEffects);
                this.setEffectDisabled(effect.name, disabled) //keep disabled status
                this.gamePoints.startListening()
            });
        }
    }

    protected setEffectDisabled(effectName: string, disabled: boolean) {
        this.effects.filter(e => e.name === effectName).forEach(e => e.disabled = disabled);
    }

    protected readonly parseInt = parseInt;
}
