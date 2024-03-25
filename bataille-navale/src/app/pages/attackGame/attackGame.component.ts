import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import Boat from "src/app/models/boat";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-attack-game",
  templateUrl: "./attackGame.component.html",
  styleUrls: ["./attackGame.component.css"],
})
export class AttackGameComponent {
  @Input() myBoats: Boat[] | undefined;
  @Output() onGameFinishedEvent = new EventEmitter<StatusEndGame>();
  subscription: Subscription;

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.endGameEvent.subscribe(
      (statusEndGame: StatusEndGame) => {
        console.log(statusEndGame);
        this.onGameFinishedEvent.emit(statusEndGame);
      }
    );
  }
}
