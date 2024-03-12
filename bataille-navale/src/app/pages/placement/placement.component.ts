import { Component, EventEmitter, Output } from "@angular/core";
import { PorteAvion } from "src/app/locales/boats";
import GridBoat from "src/app/models/GridBoat";
import { Boat } from "src/app/models/boat";

@Component({
  selector: "app-placement",
  templateUrl: "./placement.component.html",
  styleUrls: ["./placement.component.css"],
})
export class PlacementComponent {
  @Output() onAllBoatAreDisposeEvent = new EventEmitter<GridBoat[]>();

  selectedBoat = undefined as unknown as Boat;
  onGridBoats = [] as GridBoat[];
  isLastBoatSelected = false;

  onBoatSelected(boat: Boat) {
    this.selectedBoat = boat;
    console.log("onBoatSelected");
    console.log(this.selectedBoat);
  }

  onBoatSelectedIsPlacedOnTheGrid() {
    this.selectedBoat = undefined as unknown as Boat;

    if (this.isLastBoatSelected) {
      console.log("Let's the game begin !");
      console.log(this.onGridBoats);
      this.onAllBoatAreDisposeEvent.emit(this.onGridBoats);
    }
  }

  onGridUpdate(onGridBoats: GridBoat[]) {
    this.onGridBoats = onGridBoats;
  }

  onLastBoatSelected() {
    this.isLastBoatSelected = true;
  }
}
