import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CoreService} from '../core.service';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

interface LoginInfo {
    userName: string;
    password: string;
}

interface Tokens {
    jwt: string,
    refreshToken: string
}

/**
 * This class handles the login functionality.
 */

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    // references to userName and password input
    public userName: FormControl;
    public password: FormControl;

    //cache for response message of server
    public errorMessage: string;

    constructor(private coreService: CoreService) {
        this.userName = new FormControl('');
        this.password = new FormControl('');
    }

    ngOnInit() {
        this.errorMessage = "";

        this.coreService.listen('login-successful', (tokens: string) => {
            let json: Tokens = JSON.parse(tokens);
            localStorage.setItem('jwt', json.jwt);
            localStorage.setItem('refresh-token', json.refreshToken);
            location.href = "/session-joining";
        });
    }

    onSignIn(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();

        const loginInfo: LoginInfo = {
            userName: this.userName.value,
            password: this.password.value
        }

        this.coreService.sendData("login-user",
                JSON.stringify(loginInfo),
                (response: string) => this.errorMessage = response);
    }
}
