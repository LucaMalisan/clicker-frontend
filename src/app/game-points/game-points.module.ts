import {Component, Injectable, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreService} from "../core.service";

/**
 * This class handles the game points counter.
 */

@Component({
    selector: 'points',
    imports: [
        CommonModule
    ],
    templateUrl: './gamePoints.component.html',
    styleUrls: ['./gamePoints.component.css'],
})
@Injectable({
    providedIn: 'root'
})

export class GamePointsModule implements OnInit {

    constructor(protected coreService: CoreService) {
    }

    ngOnInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.startListening();
        })
    }

    public startListening() {
        //listen for current points and update the counter
        this.coreService.listen("points", (points: string) => {
            this.coreService.points = parseInt(points)
        });
    }

    public stopListening() {
        this.coreService.stopListen("points");
    }
}
