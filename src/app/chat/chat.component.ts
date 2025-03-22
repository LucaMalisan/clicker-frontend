import {Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface IChatMessageResponse {
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

export class ChatComponent implements OnInit {

    public messages: IChatMessageResponse[] = [];
    public messageInput: FormControl;

    constructor(private coreService: CoreService) {
        this.messageInput = new FormControl('');
    }

    ngOnInit() {
        this.coreService.listen("chat-message", (data: string) => {
            console.log(data);

            let json = JSON.parse(data);

            let message: IChatMessageResponse = {
                username: json.username,
                message: json.message
            }

            this.messages.push(message);
        });
    }

    sendMessage() {
        this.coreService.sendData("chat-message", JSON.stringify(this.messageInput.value));
    }
}