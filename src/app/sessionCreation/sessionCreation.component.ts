import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'session-creation',
    templateUrl: './sessionCreation.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
    styleUrls: ['./sessionCreation.component.scss']
})

export class SessionCreationComponent implements OnInit {

    public duration: FormControl;
    public errorMessage: string;

    constructor(private coreService: CoreService,
                private router: Router) {
        this.duration = new FormControl();
    }

    ngOnInit() {
        this.coreService.listen('session-creation-successful', () =>
                this.router.navigate(['game-loading']));
    }

    public createSession() {
        debugger
        this.coreService.sendData('create-session', this.duration.value, (response: string) => {
            this.errorMessage = response
        });
    }
}