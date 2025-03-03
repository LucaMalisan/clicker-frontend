import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'game-loading',
    templateUrl: './gameLoading.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    styleUrls: ['./gameLoading.component.scss']
})

export class GameLoadingComponent implements OnInit {

    public sessionKey: string = "TODO";
    public joinedPlayers: string[] = ["TODO", "TODO", "TODO", "TODO"];
    public admin: boolean = true;

    constructor(private coreService: CoreService) {
        //TODO
    }

    ngOnInit() {
        //TODO
    }
}