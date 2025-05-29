import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

/**
 * This class handles joining to a session
*/

@Component({
    selector: 'session-joining',
    templateUrl: './sessionJoining.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    styleUrls: ['./sessionJoining.component.scss']
})

export class SessionJoiningComponent implements OnInit {

    // reference to sessionKey form input
    public sessionKey: FormControl;

    // cache for server response
    public errorMessage: string;

    constructor(private coreService: CoreService) {
        this.sessionKey = new FormControl();
    }

    ngOnInit() {

        //join was successful, set session key to localstorage and redirect to game loading screen
        this.coreService.listen('join-successful', () => {
            if (this.sessionKey.value) {
                sessionStorage.setItem("session-key", this.sessionKey.value);
            }

            location.href = 'game-loading';
        });
    }

    public joinSession() {

        // inform server that user should be assigned to game session
        this.coreService.sendData('join-session', this.sessionKey.value, (response: string) => {
            this.errorMessage = response;
        });
    }
}