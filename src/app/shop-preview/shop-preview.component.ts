import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {NgForOf} from "@angular/common";

interface IEffect {
    name: string,
    description: string,
    cost: string,
    route: string
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
    ) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {

                    this.coreService.sendData("get-effects", "", (effects: string) => {
                        console.log(effects);
                        let json = JSON.parse(effects);
                        json.forEach((e: IEffect) => this.effects.push(e));
                    });

                    Array.from(document.getElementsByClassName("category-item")).forEach(e => {
                        e.addEventListener("click", ev => {
                            let target = ev.target as HTMLButtonElement;
                            console.log(target.getAttribute("action"))
                            this.coreService.points -= 50;
                            this.coreService.sendData("start-async-gen", "")
                        })
                    })
                }
        );
    }

    protected readonly parseInt = parseInt;
}
