import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  Croiseur,
  PorteAvion,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
} from "src/app/locales/boats";
import GridBoat from "src/app/models/GridBoat";
import { Boat } from "src/app/models/boat";

@Component({
  selector: "app-boat-selector",
  templateUrl: "./boatSelector.component.html",
  styleUrls: ["./boatSelector.component.css"],
})
export class BoatSelectorComponent {
  @Output() onBoatSelectedEvent = new EventEmitter<Boat>();
  @Output() onLastBoatSelectedEvent = new EventEmitter();
  @Input() selectedBoat?: Boat;
  @Input() onGridBoats?: GridBoat[];

  PorteAvion = PorteAvion;
  Croiseur = Croiseur;
  SousMarin_1 = SousMarin_1;
  SousMarin_2 = SousMarin_2;
  Torpilleur = Torpilleur;

  onBoatSelected(boat: Boat) {
    if (!this.isBoatOnTheGrid(boat)) {
      this.onBoatSelectedEvent.emit(boat);
    }
    if (this.onGridBoats && this.onGridBoats.length + 1 === 5) {
      this.onLastBoatSelectedEvent.emit();
    }
  }

  isBoatOnTheGrid(boat: Boat) {
    return (
      this.onGridBoats?.filter((b: GridBoat) => b.boatModel.type === boat.type)
        .length === 1
    );
  }
}
