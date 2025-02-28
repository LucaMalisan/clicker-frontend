import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
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
        ReactiveFormsModule,
        RouterLink
    ],
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public userName: FormControl;
    public password: FormControl;
    public responseMessage: string;

    //TODO: use local storage and server-side validation
    public static loggedIn: boolean;
    public static redirectTo: string;

    constructor(
            private coreService: CoreService,
            private router: Router) {
        this.userName = new FormControl('');
        this.password = new FormControl('');
    }

    ngOnInit() {
        this.responseMessage = "";
        this.coreService.listen('login-successful', () => {
            console.log("Login successful");
            LoginComponent.loggedIn = true;
            this.router.navigate([LoginComponent.redirectTo ? LoginComponent.redirectTo : 'chat'])
            .then(response => console.log(response));
        });
    }

    onSignIn(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();

        const loginInfo: LoginInfo = {
            userName: this.userName.value,
            password: this.password.value
        }

        LoginComponent.loggedIn = false;
        this.coreService.sendData("login-user",
                JSON.stringify(loginInfo),
                (response: string) => this.responseMessage = response);
    }
}
