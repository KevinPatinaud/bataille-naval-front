import { Component } from "@angular/core";
import Boat from "../../models/boat";
import { GameMode } from "../../locales/gameMode";
import { StatusEndGame } from "../../locales/statusEndGame";

@Component({
  selector: "app-game-engine",
  templateUrl: "./gameEngine.component.html",
  styleUrls: ["./gameEngine.component.css"],
})
export class GameEngineComponent {
  myBoats = [] as Boat[];
  displayMode = false;
  displayPlacement = false;
  displayLetsGoAnimation = false;
  displayAttackGame = false;
  displayWinAnimation = false;
  displayLoseAnimation = false;

  opponentHavePositionHisBoats = false;

  ngOnInit() {
    this.init();
  }

  init() {
    this.myBoats = [] as Boat[];
    this.displayMode = true;
    this.displayPlacement = false;
    this.displayLetsGoAnimation = false;
    this.displayAttackGame = false;
    this.displayWinAnimation = false;
    this.displayLoseAnimation = false;

    this.opponentHavePositionHisBoats = false;
  }

  onGameModeChoosed(gameMode: GameMode) {
    this.displayMode = false;
    this.displayPlacement = true;
  }

  onAllBoatAreDispose(myBoats: Boat[]) {
    setTimeout(() => {
      this.myBoats = myBoats;
      this.displayPlacement = false;
      this.displayLetsGoAnimation = true;
    }, 500);
  }

  onLetsGoAnimationFinished() {
    this.displayLetsGoAnimation = false;
    this.displayAttackGame = true;
  }

  onGameFinished(statusEndGame: StatusEndGame) {
    setTimeout(() => {
      this.displayAttackGame = false;
      if (statusEndGame === StatusEndGame.WIN) {
        console.log("Game engine : You win");
        this.displayWinAnimation = true;
      } else {
        console.log("Game engine : You lose");
        this.displayLoseAnimation = true;
      }
    }, 500);
  }

  onAnimationEndGameResultFinished() {
    this.init();
  }
}
