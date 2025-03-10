import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface ISessionInfo {
    sessionKey: string,
    admin: boolean
}

@Component({
    selector: 'game-loading',
    templateUrl: './gameLoading.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf],
    styleUrls: ['./gameLoading.component.scss']
})

export class GameLoadingComponent implements OnInit {

    public sessionKey: string;
    public joinedPlayers: string[] = [];
    public admin: boolean;

    constructor(private coreService: CoreService) {
        //TODO
    }

    ngOnInit() {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData('get-session-info', '', (response: string) => {
                console.log(`Received response ${response}`)
                let json: ISessionInfo = JSON.parse(response);
                this.sessionKey = json.sessionKey;
                this.admin = json.admin;
            });
        });

        this.coreService.listen('player-joined', (player: string) => {
            console.log(player);
            this.joinedPlayers.push(player)
        })
    }
}