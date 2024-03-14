import { EventEmitter, Injectable } from "@angular/core";
import { CompatClient, Stomp, messageCallbackType } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  stompClient: CompatClient;
  serverUrl = "ws://localhost:8080/batailleNavale";
  idGame = "ID_GAME_1";
  idPlayer = "player_1";

  constructor() {
    this.stompClient = Stomp.over(new WebSocket(this.serverUrl));
  }

  connect(callback: messageCallbackType) {
    this.stompClient.connect({}, callback);
  }

  subscribe(action: string, callback: messageCallbackType) {
    this.stompClient.subscribe(
      "/diffuse/" + this.idGame + "/" + action,
      callback
    );
  }

  send(action: string, data: string) {
    this.stompClient.send(
      "/action/" + this.idGame + "/" + action + "/" + this.idPlayer,
      {},
      data
    );
  }
}
