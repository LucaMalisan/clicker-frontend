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

/**
 * This class handles the chat functionality.
 *
 */

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

    // frontend-cache for all messages
    public messages: IChatMessageResponse[] = [];

    // reference to chat message input
    public messageInput: FormControl;

    constructor(private coreService: CoreService) {
        this.messageInput = new FormControl('');
    }

    ngAfterViewInit(): void {
        this.coreService.initialized.subscribe(() => {
            // populate chat window with all that messages
            this.coreService.sendData("get-chat-messages", localStorage.getItem("session-key"), (data: string) => this.addNewChatMessage(data));
        });
    }

    ngOnInit() {
        this.coreService.initialized.subscribe(() => {
            // listen for new messages
            this.coreService.listen("chat-message", (data: string) => this.addNewChatMessage(data));
        });
    }

    addNewChatMessage(data: string) {
        let json = JSON.parse(data);

        for (let entry of json) {
            let message: IChatMessageResponse = {
                username: entry.username,
                message: entry.message,
            }
             // put new message at the top of the list
            this.messages.unshift(message);
        }
    }

    sendMessage() {
        let requestDTO: IChatMessage = {
            value: this.messageInput.value,
            sessionKey: localStorage.getItem("session-key")
        }

        // send new chat message to the server
        this.coreService.sendData("chat-message", JSON.stringify(requestDTO));
    }

    /**
     * Enables the send button if the message input is not empty.
     */
    enableSendButton() {
        if (this.messageInput.value) {
            document.getElementById("send-button").removeAttribute("disabled");
        } else {
            document.getElementById("send-button").setAttribute("disabled", "");
        }
    }

    protected readonly document = document;
}