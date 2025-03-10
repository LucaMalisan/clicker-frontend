import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'session-joining',
    templateUrl: './sessionJoining.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
    styleUrls: ['./sessionJoining.component.scss']
})

export class SessionJoiningComponent implements OnInit {
    public sessionKey: FormControl;

    constructor(private coreService: CoreService,
                private router: Router) {
        this.sessionKey = new FormControl();
    }

    ngOnInit() {
        this.coreService.listen('join-successful', () =>
                this.router.navigate(['game-loading']));
    }

    public joinSession() {
        this.coreService.sendData('join-session', this.sessionKey.value);
    }
}