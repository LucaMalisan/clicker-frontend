import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from "./chat/chat.component";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {SessionCreationComponent} from "./sessionCreation/sessionCreation.component";
import {SessionJoiningComponent} from "./sessionJoining/sessionJoining.component";
import {GameLoadingComponent} from "./gameLoading/gameLoading.component";
import {GameComponent} from "./game/game.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'session-creation', component: SessionCreationComponent},
    {path: 'session-joining', component: SessionJoiningComponent},
    {path: 'game-loading', component: GameLoadingComponent},
    {path: 'game', component: GameComponent},
    {path: '*', redirectTo: 'session-joining', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
