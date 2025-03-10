import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CoreService} from "./core.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private coreService: CoreService) {
    }
}
