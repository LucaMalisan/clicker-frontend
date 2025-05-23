import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

interface IChatMessageResponse {
    username: string;
    message: string;
}

interface IChatMessage {
    value: string;
    sessionKey: string;
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

export class ChatComponent implements OnInit, AfterViewInit {

    public messages: IChatMessageResponse[] = [];
    public messageInput: FormControl;

    constructor(private coreService: CoreService) {
        this.messageInput = new FormControl('');
    }

    ngAfterViewInit(): void {
        this.coreService.initialized.subscribe(() => {
            this.coreService.sendData("get-chat-messages", sessionStorage.getItem("session-key"), (data: string) => this.addNewChatMessage(data));
        });
    }

    ngOnInit() {
        this.coreService.initialized.subscribe(() => {
            this.coreService.listen("chat-message", (data: string) => this.addNewChatMessage(data));
        });
    }

    addNewChatMessage(data: string) {
        let json = JSON.parse(data);
        console.log(json);

        for (let entry of json) {
            console.log(entry);

            let message: IChatMessageResponse = {
                username: entry.username,
                message: entry.message,
            }

            this.messages.unshift(message);
        }
    }

    sendMessage() {
        let requestDTO: IChatMessage = {
            value: this.messageInput.value,
            sessionKey: sessionStorage.getItem("session-key")
        }

        this.coreService.sendData("chat-message", JSON.stringify(requestDTO));
    }

    enableSendButton() {
        if (this.messageInput.value) {
            document.getElementById("send-button").removeAttribute("disabled");
        } else {
            document.getElementById("send-button").setAttribute("disabled", "");
        }
    }

    protected readonly document = document;
}