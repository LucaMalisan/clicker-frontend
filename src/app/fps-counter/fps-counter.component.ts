import {Component} from '@angular/core';

@Component({
    selector: 'app-fps-counter',
    imports: [],
    templateUrl: './fps-counter.component.html',
    styleUrl: './fps-counter.component.css'
})
export class FpsCounterComponent {

    protected times = [];
    protected fps;

    constructor() {
        this.refreshLoop();
    }

    protected refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            this.times = this.times.filter(e => e > (now - 1000));
            this.times.push(now);
            this.fps = this.times.length;
            this.refreshLoop();
        });
    }
}
