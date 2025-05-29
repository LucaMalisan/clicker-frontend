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
    ended: boolean,
    joinedPlayers: string[]
    admin: boolean
}

/**
 * This class provides methods with commonly used logic
 * Additionally, it acts as a request filter that redirects to other pages if necessary
 */

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    public initialized: Subject<Boolean> = new ReplaySubject();
    public points: number = 0;
    public protectedPages = ["/game", "/game-loading", "/end-leaderboard"];

    constructor(private router: Router) {

        // socket io initialization
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

            // register client at server
            this.sendData('register', JSON.stringify(tokens), (response: string) => {
                let json: Response = JSON.parse(response);

                console.log("JWT token is valid: " + json.success)

                // user is not (correctly) authenticated and has no permission to access page, redirect to login
                if (!json.success) {
                    this.router.navigate(['login'])
                    return;
                }

                // jwt might have been refreshed, set it to sessionStorage
                sessionStorage.setItem('jwt', json.jwt);

                // inform that client is online
                this.sendData('player-online', sessionStorage.getItem("session-key"), () => {
                    // indicate to component classes that initialization is done
                    this.initialized.next(true);
                });

                // filter request - redirect to according page if necessary
                if (this.protectedPages.includes(location.pathname)) {
                    this.sendData('get-session-info', sessionStorage.getItem("session-key"), async (response: string) => {
                        let json: ISessionInfo = JSON.parse(response);

                        // user isn't assigned to any session, redirect to session join
                        if (!json.sessionKey) {
                            this.router.navigate(["session-joining"]);
                            return;
                        }

                        // game has ended, redirect to end leaderboard
                        if(json.ended) {
                            this.router.navigate(["end-leaderboard"]);
                            return;
                        }

                        // game has already started, redirect to game screen
                        if (json.started) {
                            this.router.navigate(["game"]);
                            return;
                        }

                        // user is assigned to game but it didn't start - redirect to game-loading
                        await this.router.navigate(["game-loading"]);
                    });
                }
            });
        });
    }

    // send event with data, handle response
    sendData(event: string, data: string, handler = undefined) {
        handler = handler ? handler : () => {
        };
        this.socket.emit(event, data, handler);
    }

    // listen to event and handle it
    listen(event: string, handler: (data: any) => void) {
        this.stopListen(event);
        this.socket.on(event, handler);
    }

    stopListen(event: string) {
        this.socket.off(event);
    }
}
