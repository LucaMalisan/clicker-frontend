import {Component} from '@angular/core';

/**
 * This class handles the FPS counter functionality.
 */

@Component({
    selector: 'app-fps-counter',
    imports: [],
    templateUrl: './fps-counter.component.html',
    styleUrl: './fps-counter.component.css'
})
export class FpsCounterComponent {

    protected times = [];
    protected fps: number;

    constructor() {
        this.refreshLoop();
    }

    protected refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            this.times = this.times.filter(e => e > (now - 1000)); // remove all entries older than 1s
            this.times.push(now); //add new frame
            this.fps = this.times.length; //all frames of the last second = current fps
            this.refreshLoop();
        });
    }
}
