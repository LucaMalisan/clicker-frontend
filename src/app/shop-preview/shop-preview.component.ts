import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgForOf} from "@angular/common";

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
    ) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
                    this.coreService.sendData("get-effects", "", (effects: string) => {
                        console.log(effects);
                        let json = JSON.parse(effects);
                        json.forEach((e: IEffect) => this.effects.push(e));
                    });
                }
        );
    }

    handleEffectClick(effect: IEffect) {
        if (!this.updateInProgress && this.coreService.points >= parseInt(effect.cost)) {
            this.updateInProgress = true;
            this.coreService.points -= parseInt(effect.cost);

            this.coreService.sendData(effect.route, "", (updatedEffects: string) => {
                console.log(updatedEffects);
                this.effects = JSON.parse(updatedEffects);
                this.updateInProgress = false;
            });
        }
    }

    protected readonly parseInt = parseInt;
}
