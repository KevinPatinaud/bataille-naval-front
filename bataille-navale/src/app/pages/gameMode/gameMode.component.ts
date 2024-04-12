import { Component, EventEmitter, Output } from "@angular/core";
import { GameMode } from "src/app/locales/gameMode";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-game-mode",
  templateUrl: "./gameMode.component.html",
  styleUrls: ["./gameMode.component.css"],
})
export class GameModeComponent {
  @Output() onGameModeChoosed = new EventEmitter<GameMode>();
  GameMode = GameMode;

  displaySoloOrMultiBtn = true;
  displayMultiplayerOptionBox = false;

  constructor(private gameService: GameService) {}

  choseModeSolo() {
    this.gameService.generateNewGame(GameMode.SOLO);
    this.onGameModeChoosed.emit(GameMode.SOLO);
  }

  choseModeMultiPlayer() {
    this.displaySoloOrMultiBtn = false;
    this.displayMultiplayerOptionBox = true;
  }

  closeMultiPlayerBox() {
    this.displaySoloOrMultiBtn = true;
    this.displayMultiplayerOptionBox = false;
  }

  joinGame(idGame: string) {
    console.log("partie multi : " + idGame);
    this.onGameModeChoosed.emit(GameMode.MULTI);
  }
}
