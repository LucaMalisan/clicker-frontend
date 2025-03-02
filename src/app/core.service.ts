import {Injectable, OnInit} from '@angular/core';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {io, Socket} from "socket.io-client";
import {LoginComponent} from "./login/login.component";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    //TODO env variable
    public url = 'http://localhost:3000';
    public socket: Socket<DefaultEventsMap, DefaultEventsMap>;

    constructor(private router: Router) {
        this.socket = io(this.url, {
            reconnection: false
        });

        this.socket.on('connect', () => {
            console.log("connection attempt started")
            let jwt = localStorage.getItem('jwt');

            this.sendData('register', jwt, (authenticated: string) => {
                console.log("JWT token is valid: " + authenticated)

                if (authenticated !== 'true') {
                    this.router.navigate(['login'])
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
        this.socket.on(event, handler);
    }
}
