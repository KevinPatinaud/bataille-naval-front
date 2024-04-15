import { Component, EventEmitter, Output } from "@angular/core";
import { GameMode } from "src/app/locales/gameMode";
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
  isAllBoatsArePositionned = false;
  isOpponentHavePositionHisBoat = false;
  isWaitingForOpponentPositionHisBoat = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    const that = this;
    this.gameService.opponentPositionBoatDoneEvent.subscribe(() => {
      that.isOpponentHavePositionHisBoat = true;
      if (that.isAllBoatsArePositionned) {
        that.onAllBoatAreDisposeEvent.emit(that.onGridBoats);
      }
    });
  }

  onBoatSelected(boat: BoatDescription) {
    this.selectedBoat = boat;
    console.log(this.selectedBoat);
  }

  onBoatSelectedIsPlacedOnTheGrid() {
    this.selectedBoat = undefined as unknown as BoatDescription;

    // when we dispose the last boat
    if (this.isLastBoatSelected) {
      this.gameService.submitBoatsPositions(this.onGridBoats);
      this.isAllBoatsArePositionned = true;

      // if the opponent hade already dispose  all his boats when send the event
      if (
        this.isOpponentHavePositionHisBoat ||
        this.gameService.gameMode === GameMode.SOLO
      ) {
        this.onAllBoatAreDisposeEvent.emit(this.onGridBoats);
      }
      // if the opponent haven't already dispose his boats we indicate that we are waiting
      else {
        this.isWaitingForOpponentPositionHisBoat = true;
      }
    }
  }

  onGridUpdate(onGridBoats: Boat[]) {
    this.onGridBoats = onGridBoats;
  }

  onLastBoatSelected() {
    this.isLastBoatSelected = true;
  }
}
