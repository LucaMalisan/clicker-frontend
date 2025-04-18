import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CoreService} from '../core.service';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../login/login.component";

interface RegistrationInfo {
    userName: string;
    password: string;
}

@Component({
    selector: 'app-registration',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink
    ],
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public userName: FormControl;
    public password: FormControl;
    public responseMessage: string;

    constructor(
            private coreService: CoreService,
            private router: Router) {
        this.userName = new FormControl('');
        this.password = new FormControl('');
    }

    ngOnInit() {
        this.coreService.listen('registration-successful', () => {
            console.log("Registration successful");
            this.router.navigate(['login'])
            .then(response => console.log(`Redirect to login : ${response}`));
        });
    }

    onRegister(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();

        const registrationInfo: RegistrationInfo = {
            userName: this.userName.value,
            password: this.password.value
        }

        this.coreService.sendData("register-user",
                JSON.stringify(registrationInfo),
                (response: string) => this.responseMessage = response);
    }
}
