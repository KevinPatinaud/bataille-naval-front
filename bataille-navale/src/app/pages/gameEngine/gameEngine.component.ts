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

@Component({
  selector: "app-game-engine",
  templateUrl: "./gameEngine.component.html",
  styleUrls: ["./gameEngine.component.css"],
})
export class GameEngineComponent {
  myBoats = [] as Boat[];
  displayPlacement = true;
  displayLetsGoAnimation = false;
  displayAttackGame = false;
  displayWinAnimation = false;
  displayLoseAnimation = false;

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
      if (statusEndGame === StatusEndGame.Win) {
        console.log("Game engine : You win");
        this.displayWinAnimation = true;
      } else {
        console.log("Game engine : You lose");
        this.displayLoseAnimation = true;
      }
    }, 500);
  }

  onAnimationEndGameResultFinished() {
    window.location.href = "/";
  }
}
