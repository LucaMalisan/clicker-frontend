import {Injectable, OnInit} from '@angular/core';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {io, Socket} from "socket.io-client";

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    //TODO env variable
    public url = 'http://localhost:3000';
    public socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    public loggedIn: boolean;
    public redirectTo: string;

    constructor() {
        this.socket = io(this.url, {
            reconnection: false
        });

        this.socket.on('connect', () => {
            console.log("connection attempt started")
            this.sendData('register', '');
        });
    }

    sendData(event: string, data: string) {
        this.socket.emit(event, data);
    }

    listen(event: string, handler: (data: any) => void) {
        this.socket.on(event, handler);
    }
}
