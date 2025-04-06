import {Injectable, OnInit} from '@angular/core';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {io, Socket} from "socket.io-client";
import {Router} from "@angular/router";
import {ReplaySubject, Subject} from "rxjs";

interface Tokens {
    jwt: string,
    refreshToken: string
}

interface Response {
    success: boolean,
    jwt: string
}

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    //TODO env variable
    public url = 'http://localhost:3000';
    public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    public initialized: Subject<Boolean> = new ReplaySubject();
    public points: number = 0;

    constructor(private router: Router) {
        this.socket = io(this.url, {
            reconnection: false
        });

        this.socket.on('connect', () => {
            console.log("connection attempt started")
            let jwt = localStorage.getItem('jwt');
            let refreshToken = localStorage.getItem('refresh-token');
            let tokens: Tokens = {
                jwt: jwt,
                refreshToken: refreshToken
            }

            this.sendData('register', JSON.stringify(tokens), (response: string) => {
                let json: Response = JSON.parse(response);

                console.log("JWT token is valid: " + json.success)

                if (!json.success) {
                    this.router.navigate(['login'])
                }

                localStorage.setItem('jwt', json.jwt);
                this.initialized.next(true);
            });
        });
    }

    sendData(event: string, data: string, handler = undefined) {
        handler = handler ? handler : () => {
        };
        this.socket.emit(event, data, handler);
    }

    listen(event: string, handler: (data: any) => void) {
        this.socket.on(event, handler);
    }

    stopListen(event: string) {
        this.socket.off(event);
    }
}
