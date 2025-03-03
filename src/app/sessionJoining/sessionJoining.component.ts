import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'session-joining',
    templateUrl: './sessionJoining.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
    styleUrls: ['./sessionJoining.component.scss']
})

export class SessionJoiningComponent implements OnInit {

    constructor(private coreService: CoreService) {
        //TODO
    }

    ngOnInit() {
        //TODO
    }
}