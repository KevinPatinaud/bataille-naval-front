import { Component } from "@angular/core";
import { Location } from "@angular/common";
import {
  Croiseur,
  PorteAvion,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
} from "src/app/locales/boats";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import Boat from "src/app/models/boat";
import { Router } from "@angular/router";
import { GameService } from "src/app/services/game/game.service";
import { GameMode } from "src/app/locales/gameMode";

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
