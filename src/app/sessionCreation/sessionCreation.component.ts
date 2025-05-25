import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

/**
 * This class handles the creation of game sessions
 */

@Component({
    selector: 'session-creation',
    templateUrl: './sessionCreation.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    styleUrls: ['./sessionCreation.component.scss']
})

export class SessionCreationComponent implements OnInit {

    //reference to duration input field
    public duration: FormControl;
    public errorMessage: string;

    constructor(private coreService: CoreService) {
        this.duration = new FormControl();
    }

    ngOnInit() {
        // when the session was successfully created, the user should automatically join to it
        this.coreService.listen('session-creation-successful', (sessionKey) => {
            sessionStorage.setItem("session-key", sessionKey);
            this.coreService.sendData('join-session', sessionKey);
        });
    }

    public createSession() {
        // inform server that new session should be created with given duration
        this.coreService.sendData('create-session', this.duration.value, (response: string) => {
            this.errorMessage = response
        });
    }
}