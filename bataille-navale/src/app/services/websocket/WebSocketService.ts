import { Injectable } from "@angular/core";
import { CompatClient, Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  stompClient: CompatClient;
  serverUrl = "ws://localhost:8080/greeting";

  constructor() {
    this.stompClient = Stomp.over(new WebSocket(this.serverUrl));
  }

  connect() {
    const that = this;

    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe("/topic/reply", (message: any) => {
        console.log(JSON.parse(message.body).content);
      });
    });
  }

  sendMessage(message: string) {
    /*
    this.stompClient.send(
      "/app/message",
      {},
      JSON.stringify({ content: message })
    );
  */
  }
}
