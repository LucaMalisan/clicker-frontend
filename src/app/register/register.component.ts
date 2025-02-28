import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CoreService} from '../core.service';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

interface RegistrationInfo {
    userName: string;
    password: string;
}

@Component({
    selector: 'app-registration',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule
    ],
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    public userName: FormControl;
    public password: FormControl;

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
            .then(response => console.log(response));
        });
    }

    onRegister(evt: Event) {
        evt.preventDefault();
        evt.stopPropagation();

        const registrationInfo: RegistrationInfo = {
            userName: this.userName.value,
            password: this.password.value
        }

        this.coreService.loggedIn = false;
        this.coreService.sendData("register-user", JSON.stringify(registrationInfo));
    }
}
