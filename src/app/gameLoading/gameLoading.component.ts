import {Component, HostListener, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

interface ISessionInfo {
    sessionKey: string,
    started: boolean,
    joinedPlayers: string[]
    admin: boolean
}

@Component({
    selector: 'game-loading',
    templateUrl: './gameLoading.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgForOf, RouterLink],
    styleUrls: ['./gameLoading.component.scss']
})

export class GameLoadingComponent implements OnInit {

    public sessionKey: string;
    public joinedPlayers: string[] = [];
    public admin: boolean;

    constructor(protected coreService: CoreService,
                private router: Router) {
    }

    ngOnInit() {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData('get-session-info', localStorage.getItem("session-key"), (response: string) => {
                let json: ISessionInfo = JSON.parse(response);

                if (!json.sessionKey) {
                    this.router.navigate(["session-joining"])
                }

                if (json.started) {
                    this.router.navigate(["game"]);
                }

                this.joinedPlayers = json.joinedPlayers;
                this.sessionKey = json.sessionKey;
                this.admin = json.admin;
            });

            this.coreService.listen("start-game", () => this.router.navigate(["game"]));

            this.coreService.listen('player-joined', (players: string) => {
                this.joinedPlayers = JSON.parse(players);
            });
        });
    }

    @HostListener('window:beforeunload', ['$event'])
    notifyPlayerOffline() {
        this.coreService.sendData('player-offline', localStorage.getItem("session-key"));
    }

    protected readonly localStorage = localStorage;
}