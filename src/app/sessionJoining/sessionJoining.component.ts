import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'session-joining',
    templateUrl: './sessionJoining.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink],
    styleUrls: ['./sessionJoining.component.scss']
})

export class SessionJoiningComponent implements OnInit {

    public sessionKey: FormControl;
    public errorMessage: string;


    constructor(private coreService: CoreService,
                private router: Router) {
        this.sessionKey = new FormControl();
    }

    ngOnInit() {
        this.coreService.listen('join-successful', () => {
            if (this.sessionKey.value) {
                sessionStorage.setItem("session-key", this.sessionKey.value);
            }

            location.href = 'game-loading';
        });
    }

    public joinSession() {
        this.coreService.sendData('join-session', this.sessionKey.value, (response: string) => {
            this.errorMessage = response;
        });
    }
}