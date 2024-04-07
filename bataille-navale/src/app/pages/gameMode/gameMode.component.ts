import { Component, EventEmitter, Output } from "@angular/core";
import { GameMode } from "src/app/locales/gameMode";

@Component({
  selector: "app-game-mode",
  templateUrl: "./gameMode.component.html",
  styleUrls: ["./gameMode.component.css"],
})
export class GameModeComponent {
  @Output() onGameModeChoosed = new EventEmitter<GameMode>();
  GameMode = GameMode;

  choseMode(gameMode: GameMode) {
    this.onGameModeChoosed.emit(gameMode);
  }
}
