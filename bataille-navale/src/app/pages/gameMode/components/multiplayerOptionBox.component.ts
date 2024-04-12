import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-multi-player-option-box",
  templateUrl: "./multiplayerOptionBox.component.html",
  styleUrls: ["./multiplayerOptionBox.component.css"],
})
export class MultiPlayerOptionBoxComponent {
  @Output() closeEvent = new EventEmitter();

  myIdGame: string = "";
  opponentIdGame: String = "";
  constructor(private gameService: GameService) {}

  ngOnInit() {
    const that = this;
    this.gameService
      .getNewIdGame()
      .subscribe((idGame: string) => (that.myIdGame = idGame));
  }

  closeBox() {
    this.closeEvent.emit();
  }

  updateOpponentIdGame(value: string) {
    console.log(value);
  }
}
