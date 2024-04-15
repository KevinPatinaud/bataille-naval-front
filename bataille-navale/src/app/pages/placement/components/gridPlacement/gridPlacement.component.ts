import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import Boat from "src/app/models/boat";
import { BoatDescription } from "src/app/models/boatDescription";
import { Coordinate } from "src/app/models/coordinate";

@Component({
  selector: "app-grid-placement",
  templateUrl: "./gridPlacement.component.html",
  styleUrls: ["./gridPlacement.component.css"],
})
export class GridPlacementComponent {
  @Input() selectedBoat?: BoatDescription;
  @Output() gridUpdateEvent = new EventEmitter<Boat[]>();
  @Output() boatSelectedIsPlacedEvent = new EventEmitter();
  cellHover = undefined as unknown as Coordinate;
  isHorizontalBoat = false;

  boatOnGridList = [] as Boat[];

  onSelectCell(cell: Coordinate) {
    if (this.selectedBoat === undefined || !this.cellCanBeSelected(cell)) {
      return;
    }

    this.boatOnGridList.push({
      boatPosition: {
        xHead: this.getXBoatHead(
          cell,
          this.selectedBoat,
          this.isHorizontalBoat
        ),
        yHead: this.getYBoatHead(
          cell,
          this.selectedBoat,
          this.isHorizontalBoat
        ),
        isHorizontal: this.isHorizontalBoat,
      },
      boatDescription: this.selectedBoat,
      boatState: { isDestroyed: false },
    });

    this.boatSelectedIsPlacedEvent.emit();
    this.gridUpdateEvent.emit(this.boatOnGridList);
  }

  onHoverCell(caseHover: Coordinate) {
    this.cellHover = caseHover;
  }

  onLeaveGrid() {
    this.cellHover = undefined as unknown as Coordinate;
  }

  cellHoverCanBeSelected(): boolean {
    if (this.cellHover === undefined || this.selectedBoat === undefined)
      return false;

    return this.cellCanBeSelected(this.cellHover);
  }

  cellCanBeSelected(cell: Coordinate): boolean {
    if (this.selectedBoat === undefined) return false;

    const xBoatHead = this.getXBoatHead(
      cell,
      this.selectedBoat,
      this.isHorizontalBoat
    );

    const yBoatHead = this.getYBoatHead(
      cell,
      this.selectedBoat,
      this.isHorizontalBoat
    );

    for (let i = 0; i < this.selectedBoat.size; i++) {
      if (
        this.cellIsNearABoat({
          x: xBoatHead + (this.isHorizontalBoat ? i : 0),
          y: yBoatHead + (!this.isHorizontalBoat ? i : 0),
        })
      )
        return false;
    }

    return (
      this.cellHover !== undefined && !this.cellIsNearABoat(this.cellHover)
    );
  }

  cellIsOccupied(cell: Coordinate): boolean {
    for (let iGB = 0; iGB < this.boatOnGridList.length; iGB++) {
      const boat = this.boatOnGridList[iGB];

      for (let i = 0; i < boat.boatDescription.size; i++) {
        if (boat.boatPosition) {
          const xBoat =
            boat.boatPosition.xHead + (boat.boatPosition.isHorizontal ? i : 0);
          const yBoat =
            boat.boatPosition.yHead + (!boat.boatPosition.isHorizontal ? i : 0);

          if (xBoat === cell.x && yBoat === cell.y) {
            return true;
          }
        }
      }
    }

    return false;
  }

  getXBoatHead(
    cell: Coordinate,
    boatDescription: BoatDescription,
    isHorizontalBoat: boolean
  ) {
    return isHorizontalBoat
      ? Math.min(cell.x, 10 - boatDescription.size)
      : cell.x;
  }

  getYBoatHead(
    cell: Coordinate,
    boatDescription: BoatDescription,
    isHorizontalBoat: boolean
  ) {
    return !isHorizontalBoat
      ? Math.min(cell.y, 10 - boatDescription.size)
      : cell.y;
  }

  cellIsInTheBoatRange(cell: Coordinate): boolean {
    if (this.cellHover === undefined || this.selectedBoat === undefined)
      return false;

    if (
      this.isHorizontalBoat &&
      cell.x >= Math.min(this.cellHover.x, 10 - this.selectedBoat.size) &&
      cell.x <= this.cellHover.x + this.selectedBoat.size - 1 &&
      this.cellHover.y === cell.y
    ) {
      return true;
    }

    if (
      !this.isHorizontalBoat &&
      cell.y >= Math.min(this.cellHover.y, 10 - this.selectedBoat.size) &&
      cell.y <= this.cellHover.y + this.selectedBoat.size - 1 &&
      this.cellHover.x === cell.x
    ) {
      return true;
    }

    return false;
  }

  cellIsNearABoat(cell: Coordinate) {
    let result = false;
    this.boatOnGridList.forEach((boat: Boat) => {
      if (boat.boatPosition) {
        const xMin = boat.boatPosition.xHead - 1;
        const yMin = boat.boatPosition.yHead - 1;
        const xMax =
          boat.boatPosition.xHead +
          (boat.boatPosition.isHorizontal ? boat.boatDescription.size : 1);
        const yMax =
          boat.boatPosition.yHead +
          (!boat.boatPosition.isHorizontal ? boat.boatDescription.size : 1);

        if (
          cell.x >= xMin &&
          cell.x <= xMax &&
          cell.y >= yMin &&
          cell.y <= yMax
        ) {
          result = true;
        }
      }
    });

    return result;
  }

  @HostListener("document:keydown.space", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.isHorizontalBoat = !this.isHorizontalBoat;
  }
}
