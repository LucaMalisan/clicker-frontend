import {HostListener, Injectable, OnInit} from '@angular/core';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {io, Socket} from "socket.io-client";
import {Router} from "@angular/router";
import {ReplaySubject, Subject} from "rxjs";
import {environment} from "../environments/environment";

interface Tokens {
    jwt: string,
    refreshToken: string
}

interface Response {
    success: boolean,
    jwt: string
}

interface ISessionInfo {
    sessionKey: string,
    started: boolean,
    joinedPlayers: string[]
    admin: boolean
}

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    public initialized: Subject<Boolean> = new ReplaySubject();
    public points: number = 0;
    public protectedPages = ["/game", "/game-loading", "/end-leaderboard"];

    constructor(private router: Router) {
        this.socket = io(environment.API_URL, {
            reconnection: false
        });

        this.socket.on('connect', () => {
            console.log("connection attempt started")
            let jwt = sessionStorage.getItem('jwt');
            let refreshToken = sessionStorage.getItem('refresh-token');
            let tokens: Tokens = {
                jwt: jwt,
                refreshToken: refreshToken
            }

            this.sendData('register', JSON.stringify(tokens), (response: string) => {
                let json: Response = JSON.parse(response);

                console.log("JWT token is valid: " + json.success)

                if (!json.success) {
                    this.router.navigate(['login'])
                    return;
                }

                sessionStorage.setItem('jwt', json.jwt);

                this.sendData('player-online', sessionStorage.getItem("session-key"), () => {
                    this.initialized.next(true);
                });

                if (this.protectedPages.includes(location.pathname)) {
                    this.sendData('get-session-info', sessionStorage.getItem("session-key"), async (response: string) => {
                        let json: ISessionInfo = JSON.parse(response);

                        if (!json.sessionKey) {
                            this.router.navigate(["session-joining"]);
                            return;
                        }

                        if (json.started) {
                            this.router.navigate(["game"]);
                            return;
                        }

                        await this.router.navigate(["game-loading"]);
                    });
                }
            });
        });
    }

    sendData(event: string, data: string, handler = undefined) {
        handler = handler ? handler : () => {
        };
        this.socket.emit(event, data, handler);
    }

    listen(event: string, handler: (data: any) => void) {
        this.stopListen(event);
        this.socket.on(event, handler);
    }

    stopListen(event: string) {
        this.socket.off(event);
    }
}
