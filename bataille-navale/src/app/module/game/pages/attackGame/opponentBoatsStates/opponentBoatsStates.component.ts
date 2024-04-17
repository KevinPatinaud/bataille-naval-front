import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { Croiseur, PorteAvion, SousMarin_1, SousMarin_2, Torpilleur } from "../../../locales/boats";
import Boat from "../../../models/boat";
import { GameService } from "../../../services/game/game.service";

@Component({
  selector: "app-opponent-boats-states",
  templateUrl: "./opponentBoatsStates.component.html",
  styleUrls: ["./opponentBoatsStates.component.css"],
})
export class OpponentBoatsStatesComponent {
  subscription: Subscription;

  opponentBoats = [
    {
      boatDescription: Croiseur,
      boatState: { isDestroyed: false },
    },
    {
      boatDescription: PorteAvion,
      boatState: { isDestroyed: false },
    },
    {
      boatDescription: SousMarin_1,
      boatState: { isDestroyed: false },
    },
    {
      boatDescription: SousMarin_2,
      boatState: { isDestroyed: false },
    },
    {
      boatDescription: Torpilleur,
      boatState: { isDestroyed: false },
    },
  ] as Boat[];

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.opponentBoatsUpdateEvent.subscribe(
      (opponentBoats: Boat[]) => {
        this.opponentBoats = opponentBoats;
      }
    );
  }
}
