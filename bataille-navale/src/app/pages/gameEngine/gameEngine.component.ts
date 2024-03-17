import { Component } from "@angular/core";
import {
  Croiseur,
  PorteAvion,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
} from "src/app/locales/boats";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import Boat from "src/app/models/boat";

@Component({
  selector: "app-game-engine",
  templateUrl: "./gameEngine.component.html",
  styleUrls: ["./gameEngine.component.css"],
})
export class GameEngineComponent {
  /*
  //____________________________________________________________________________________________________________
  //PARAMETRES NORMAUX
  gridBoats = [] as GridBoat[];
  displayPlacement = true;
  displayLetsGoAnimation = false;
  displayAttackGame = false;
  displayWinAnimation = false;
*/
  // __________________________________________________________________________

  // Paramètres pour lancer directement le jeu
  gridBoats = [
    {
      boatPosition: { xHead: 4, yHead: 4, isHorizontal: false },
      boatDescription: PorteAvion,
    },
    {
      boatPosition: { xHead: 4, yHead: 7, isHorizontal: true },
      boatDescription: Croiseur,
    },
    {
      boatPosition: { xHead: 8, yHead: 5, isHorizontal: true },
      boatDescription: SousMarin_1,
    },
    {
      boatPosition: { xHead: 1, yHead: 5, isHorizontal: false },
      boatDescription: SousMarin_2,
    },
    {
      boatPosition: { xHead: 6, yHead: 8, isHorizontal: false },
      boatDescription: Torpilleur,
    },
  ] as Boat[];
  displayPlacement = false;
  displayLetsGoAnimation = false;
  displayAttackGame = true;
  displayWinAnimation = false;
  //____________________________________________________________________________________________________________/* */

  onAllBoatAreDispose(gridBoats: Boat[]) {
    console.log("Let's go");
    this.gridBoats = gridBoats;

    this.displayPlacement = false;
    this.displayLetsGoAnimation = true;
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
      }
    }, 500);
  }

  onAnimationWinFinished() {}
}
