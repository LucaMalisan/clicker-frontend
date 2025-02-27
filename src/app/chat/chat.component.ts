import {Component} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";

interface ChatMessage {
    username: string;
    message: string;
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf
    ],
    styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

    messages: ChatMessage[] = [];
    isRegistered: boolean = false;

    public messageInput: FormControl;

    constructor(
            private coreService: CoreService,
            private router: Router) {

        this.messageInput = new FormControl('');
        this.coreService = new CoreService();

        this.coreService.listen("chat-message", (data) => {
            let json = JSON.parse(data);

            let message: ChatMessage = {
                username: json.username,
                message: json.message
            }

            this.messages.push(message);
        })
    }

    sendMessage() {
        debugger

        let message: ChatMessage = {
            username: 'Player 1',
            message: this.messageInput.value
        }

        this.coreService.sendData("chat-message", JSON.stringify(message));
    }
}