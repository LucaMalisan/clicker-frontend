import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgForOf} from "@angular/common";

interface IActiveEffect {
    effectName: string,
    userName: string,
}

/**
 * This class handles the effect log functionality.
 */

@Component({
    selector: 'app-effect-log',
    imports: [
        NgForOf
    ],
    templateUrl: './effect-log.component.html',
    styleUrl: './effect-log.component.css'
})
export class EffectLogComponent implements OnInit {

    constructor(private coreService: CoreService) {
    }

    protected userInfluencingEffects: IActiveEffect[] = [];
    protected userActivatedEffects: IActiveEffect[] = [];

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {

            // effects that influence user
            this.coreService.listen("get-user-influencing-effects", (json: string) => {
                this.userInfluencingEffects = JSON.parse(json);
            });

            // effects that user has activated
            this.coreService.listen("get-user-activated-effects", (json: string) => {
                this.userActivatedEffects = JSON.parse(json);
            });
        });
    }
}
