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

/**
 * This class handles the game loading screen.
 */

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
            console.log('try to get session info')

            // get session info to display
            this.coreService.sendData('get-session-info', sessionStorage.getItem("session-key"), (response: string) => {
                console.log('get-session-info: ' + response);

                let json: ISessionInfo = JSON.parse(response);
                this.joinedPlayers = json.joinedPlayers;
                this.sessionKey = json.sessionKey;
                this.admin = json.admin;
            });

            // listen for server requesting game start
            this.coreService.listen("start-game", () => this.router.navigate(["game"]));

            // listen for new joined player, update players array
            this.coreService.listen('player-joined', (players: string) => {
                this.joinedPlayers = JSON.parse(players);
            });
        });
    }

    /**
     * Notify server that player is offline.
     */
    @HostListener('window:beforeunload', ['$event'])
    notifyPlayerOffline() {
        this.coreService.sendData('player-offline', sessionStorage.getItem("session-key"));
    }

    protected readonly sessionStorage = sessionStorage;
}