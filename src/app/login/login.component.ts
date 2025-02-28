import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from '../core.service';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

interface LoginInfo {
    userName: string;
    password: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    private redirectTo: string;

    public userName: FormControl;
    public password: FormControl;

    constructor(
            private coreService: CoreService,
            private router: Router) {
        this.userName = new FormControl('');
        this.password = new FormControl('');
    }

    ngOnInit() {
        this.coreService.listen('authenticated', () => {
            console.log("Authentication successful");
            this.coreService.loggedIn = true;
            this.router.navigate([this.redirectTo]).then(err => console.error(err));
        });
    }

    onSignIn(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();

        const loginInfo: LoginInfo = {
            userName: this.userName.value,
            password: this.password.value
        }

        this.coreService.loggedIn = false;
        this.coreService.sendData("authentication", JSON.stringify(loginInfo));
    }
}
