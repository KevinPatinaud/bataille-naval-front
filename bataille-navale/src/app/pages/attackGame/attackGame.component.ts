import { Component, EventEmitter, Output } from "@angular/core";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { WebSocketService } from "src/app/services/websocket/WebSocketService";

@Component({
  selector: "app-attack-game",
  templateUrl: "./attackGame.component.html",
  styleUrls: ["./attackGame.component.css"],
})
export class AttackGameComponent {
  @Output() onGameFinishedEvent = new EventEmitter<StatusEndGame>();

  constructor() {}

  onAllOpponentBoatDestroyed() {
    this.onGameFinishedEvent.emit(StatusEndGame.Win);
  }
}
