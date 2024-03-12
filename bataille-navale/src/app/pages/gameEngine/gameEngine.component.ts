import { Component } from "@angular/core";
import {
  Croiseur,
  PorteAvion,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
} from "src/app/locales/boats";
import GridBoat from "src/app/models/GridBoat";

@Component({
  selector: "app-game-engine",
  templateUrl: "./gameEngine.component.html",
  styleUrls: ["./gameEngine.component.css"],
})
export class GameEngineComponent {
  /*
  //____________________________________________________________________________________________________________
PARAMETRES NORMAUX
  gridBoats = [ ] as GridBoat[];
  displayPlacement = true;
  displayNewGameAnimation = false;
  displayAttackGame = false;
  */

  // __________________________________________________________________________
  // Paramètres pour lancer directement le jeu
  gridBoats = [
    { xHead: 4, yHead: 4, boatModel: PorteAvion, isHorizontal: false },
    { xHead: 4, yHead: 7, boatModel: Croiseur, isHorizontal: true },
    { xHead: 8, yHead: 5, boatModel: SousMarin_1, isHorizontal: true },
    { xHead: 1, yHead: 5, boatModel: SousMarin_2, isHorizontal: false },
    { xHead: 6, yHead: 8, boatModel: Torpilleur, isHorizontal: false },
  ] as GridBoat[];
  displayPlacement = false;
  displayNewGameAnimation = false;
  displayAttackGame = true;
  //____________________________________________________________________________________________________________

  onAllBoatAreDispose(gridBoats: GridBoat[]) {
    console.log("Let's go");
    this.gridBoats = gridBoats;
    this.displayPlacement = false;
    this.displayNewGameAnimation = true;
  }

  onAnimationNewGameFinished() {
    this.displayNewGameAnimation = false;
  }
}
