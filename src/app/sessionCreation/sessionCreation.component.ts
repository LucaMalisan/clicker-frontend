import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'session-creation',
    templateUrl: './sessionCreation.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
    styleUrls: ['./sessionCreation.component.scss']
})

export class SessionCreationComponent implements OnInit {

    constructor(private coreService: CoreService) {
        //TODO
    }

    ngOnInit() {
        //TODO
    }
}