import { EventEmitter, Injectable } from "@angular/core";
import { CompatClient, Stomp, messageCallbackType } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  stompClient: CompatClient;
  serverUrl = "ws://" + window.location.hostname + ":8080/websocket/game";

  constructor() {
    this.stompClient = Stomp.over(new WebSocket(this.serverUrl));
  }

  connectionIsWorking() {
    return this.stompClient.connected;
  }

  forceDeconnection() {
    this.stompClient.forceDisconnect();
    this.stompClient = Stomp.over(new WebSocket(this.serverUrl));
  }

  connect(callback: messageCallbackType) {
    this.stompClient.connect({}, callback);
  }

  subscribe(uri: string, callback: messageCallbackType) {
    this.stompClient.subscribe(uri, callback);
  }



  send(uri: string, data: string | undefined) {
    console.log("this.stompClient.connected");
    console.log(this.stompClient.connected);

    console.log("web socket send() : " + uri);

    this.stompClient.send(uri, {}, data);
  }
}
