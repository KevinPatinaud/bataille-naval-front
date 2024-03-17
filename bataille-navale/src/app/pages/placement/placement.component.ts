import { Component, EventEmitter, Output } from "@angular/core";
import Boat from "src/app/models/boat";
import { BoatDescription } from "src/app/models/boatDescription";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-placement",
  templateUrl: "./placement.component.html",
  styleUrls: ["./placement.component.css"],
})
export class PlacementComponent {
  @Output() onAllBoatAreDisposeEvent = new EventEmitter<Boat[]>();

  selectedBoat = undefined as unknown as BoatDescription;
  onGridBoats = [] as Boat[];
  isLastBoatSelected = false;

  constructor(private gameService: GameService) {}

  onBoatSelected(boat: BoatDescription) {
    this.selectedBoat = boat;
    console.log("onBoatSelected");
    console.log(this.selectedBoat);
  }

  onBoatSelectedIsPlacedOnTheGrid() {
    this.selectedBoat = undefined as unknown as BoatDescription;

    if (this.isLastBoatSelected) {
      console.log("Let's the game begin !");
      console.log(this.onGridBoats);
      this.gameService.submitBoatsPositions(this.onGridBoats);
      this.onAllBoatAreDisposeEvent.emit(this.onGridBoats);
    }
  }

  onGridUpdate(onGridBoats: Boat[]) {
    this.onGridBoats = onGridBoats;
  }

  onLastBoatSelected() {
    this.isLastBoatSelected = true;
  }
}
