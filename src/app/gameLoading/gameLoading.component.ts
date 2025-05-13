import {Component, HostListener, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

interface ISessionInfo {
    sessionKey: string,
    joinedPlayers: string[]
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

    constructor(private coreService: CoreService,
                private router: Router) {
        //TODO
    }

    ngOnInit() {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData('get-session-info', '', (response: string) => {
                let json: ISessionInfo = JSON.parse(response);

                if (!json.sessionKey) {
                    this.router.navigate(["session-joining"])
                }

                this.joinedPlayers = json.joinedPlayers;
                this.sessionKey = json.sessionKey;

                localStorage.setItem("session-key", json.sessionKey)
                this.admin = json.admin;
            });

            this.coreService.listen("start-game", () => this.router.navigate(["game"]));

            this.coreService.listen('player-joined', (player: string) => {
                console.log(player);
                this.joinedPlayers.push(player)
            });

            setTimeout(() =>
                    //TODO use some sort of replay-method on server that just sends message to all other clients
                    document.getElementById("start-game").addEventListener("click", () => this.coreService.sendData("start-game", "")), 500);
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    notifyPlayerOffline() {
        this.coreService.sendData('player-offline', localStorage.getItem("session-key"));
    }
}