import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from "./chat/chat.component";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {SessionCreationComponent} from "./sessionCreation/sessionCreation.component";
import {SessionJoiningComponent} from "./sessionJoining/sessionJoining.component";

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'chat', component: ChatComponent},
    {path: 'session-creation', component: SessionCreationComponent},
    {path: 'session-joining', component: SessionJoiningComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
