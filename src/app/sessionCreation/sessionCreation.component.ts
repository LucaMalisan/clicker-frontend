import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";


interface ISessionParameters {
    duration: string,
    evaluationMethod: string
}

interface IEvaluationMethod {
    value: string,
    description: string
}

/**
 * This class handles the creation of game sessions
 */

@Component({
    selector: 'session-creation',
    templateUrl: './sessionCreation.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, NgForOf],
    styleUrls: ['./sessionCreation.component.scss']
})

export class SessionCreationComponent implements OnInit {

    //reference to duration input field
    public duration: FormControl;
    public evaluationMethod: FormControl;
    public errorMessage: string;
    public availableEvaluationMethods: IEvaluationMethod[]

    constructor(private coreService: CoreService,
                private router: Router) {
        this.duration = new FormControl();
        this.evaluationMethod = new FormControl();
    }

    ngOnInit() {
        // when the session was successfully created, the user should automatically join to it
        this.coreService.listen('session-creation-successful', (sessionKey) => {
            sessionStorage.setItem("session-key", sessionKey);

            //join to the created session
            this.coreService.sendData('join-session', sessionKey);
            this.router.navigate(['session-joining']);
        });

        this.coreService.sendData("get-available-evaluation-methods", '', (evaluationMethods: string) => {
            this.availableEvaluationMethods = JSON.parse(evaluationMethods)
        });
    }

    public createSession() {
        let json: ISessionParameters = {
            duration: this.duration.value,
            evaluationMethod: this.evaluationMethod.value
        }

        // inform server that new session should be created with given duration
        this.coreService.sendData('create-session', JSON.stringify(json), (response: string) => {
            this.errorMessage = response
        });
    }
}