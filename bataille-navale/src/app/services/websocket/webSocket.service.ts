import { EventEmitter, Injectable } from "@angular/core";
import { CompatClient, Stomp, messageCallbackType } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  stompClient: CompatClient;
  serverUrl = "ws://localhost:8080/bataille-navale";

  constructor() {
    this.stompClient = Stomp.over(new WebSocket(this.serverUrl));
  }

  connect(callback: messageCallbackType) {
    this.stompClient.connect({}, callback);
  }

  subscribe(uri: string, callback: messageCallbackType) {
    this.stompClient.subscribe(uri, callback);
  }

  send(uri: string, data: string) {
    this.stompClient.send(uri, {}, data);
  }
}
