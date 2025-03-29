import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreService} from "../core.service";

@Component({
    selector: 'points',
    imports: [
        CommonModule
    ],
    templateUrl: './gamePoints.component.html',
    styleUrls: ['./gamePoints.component.css'],
})
export class GamePointsModule implements OnInit {

    constructor(protected coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.listen("points", (points: string) => {
                this.coreService.points = parseInt(points)
            });
        })
    }
}
