import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { GameService } from "src/app/services/game/game.service";
import { FormsModule } from "@angular/forms";
import { GameMode } from "src/app/locales/gameMode";

@Component({
  selector: "app-multi-player-option-box",
  templateUrl: "./multiplayerOptionBox.component.html",
  styleUrls: ["./multiplayerOptionBox.component.css"],
})
export class MultiPlayerOptionBoxComponent {
  @Output() closeEvent = new EventEmitter();
  @Output() opponentJoinGameEvent = new EventEmitter<string>();
  @Output() joinOpponentGameEvent = new EventEmitter<string>();

  formKey = 0;
  myIdGame: string = "";
  opponentIdGame: String = "";

  errorMessage = "";

  constructor(private gameService: GameService) {}

  ngOnInit() {
    const that = this;

    this.gameService
      .generateNewGame(GameMode.MULTI)
      .subscribe((idGame: string) => (that.myIdGame = idGame));

    this.gameService.opponentJoinGameEvent.subscribe((idOpponent: string) => {
      that.opponentJoinGameEvent.emit(that.myIdGame);
    });
  }

  closeBox() {
    this.closeEvent.emit();
  }

  updateOpponentIdGame(value: string) {
    this.opponentIdGame = value;
    const opponentIdGame = value
      .toUpperCase()
      .replace(/\s/g, "")
      .replace(/[^\w\-_]/g, "");

    setTimeout(() => {
      this.opponentIdGame = opponentIdGame;
    });

    if (this.myIdGame === this.opponentIdGame) {
      this.errorMessage = "Vous ne pouvez pas utiliser votre propre id";
    }

    if (value && value.length > 6 && this.myIdGame !== this.opponentIdGame) {
      const that = this;
      this.gameService
        .isGameWaitingSecondPlayer(opponentIdGame)
        .subscribe((isGameWaitingForJoinning: boolean) => {
          console.log(isGameWaitingForJoinning);

          if (isGameWaitingForJoinning) {
            that.gameService.joinGame(opponentIdGame);
            that.joinOpponentGameEvent.emit(opponentIdGame);
          }
        });
    }
  }
}
