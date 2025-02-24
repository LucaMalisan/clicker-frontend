import {Component} from '@angular/core';
import {CoreService} from "../core.service";
import {FormsModule} from "@angular/forms";

interface ChatMessage {
    username: string;
    message: string;
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})

export class ChatComponent {

    messages: ChatMessage[] = [];
    messageInput: string = '';
    isRegistered: boolean = false;

    protected coreService: CoreService;

    constructor() {
    }

    sendMessage() {
        /*   if (this.messageInput.trim() && this.isRegistered) {
               const chatMessage = {
                   event: 'chat-message',
                   username: 'Player1',
                   message: this.messageInput
               };
           } */
    }
}