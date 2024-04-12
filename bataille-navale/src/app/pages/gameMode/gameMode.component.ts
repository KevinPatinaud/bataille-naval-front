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
    const that = this;
    this.gameService.getNewIdGame().subscribe((idGame) => {
      that.gameService.setIdGame(idGame);
      that.gameService.initGame();
    });

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
}
