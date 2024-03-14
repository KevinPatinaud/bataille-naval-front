import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import GridBoat from "src/app/models/GridBoat";
import { Boat } from "src/app/models/boat";
import { Coordinate } from "src/app/models/coordinate";

@Component({
  selector: "app-grid-placement",
  templateUrl: "./gridPlacement.component.html",
  styleUrls: ["./gridPlacement.component.css"],
})
export class GridPlacementComponent {
  @Input() selectedBoat?: Boat;
  @Output() gridUpdateEvent = new EventEmitter<GridBoat[]>();
  @Output() boatSelectedIsPlacedEvent = new EventEmitter();
  cellHover = undefined as unknown as Coordinate;
  isHorizontalBoat = false;

  boatOnGridList = [] as GridBoat[];

  onSelectCell(cell: Coordinate) {
    if (this.selectedBoat === undefined || !this.cellCanBeSelected(cell)) {
      return;
    }

    this.boatOnGridList.push({
      xHead: this.getXBoatHead(cell, this.selectedBoat, this.isHorizontalBoat),
      yHead: this.getYBoatHead(cell, this.selectedBoat, this.isHorizontalBoat),
      boatModel: this.selectedBoat,
      isHorizontal: this.isHorizontalBoat,
    });

    this.boatSelectedIsPlacedEvent.emit();
    this.gridUpdateEvent.emit(this.boatOnGridList);
  }

  onHoverCell(caseHover: Coordinate) {
    this.cellHover = caseHover;
  }

  onLeaveGrid() {
    this.cellHover = undefined as unknown as Coordinate;
    console.log("onLeaveGrid");
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
        this.cellIsOccupied({
          x: xBoatHead - (this.isHorizontalBoat ? i : 0),
          y: yBoatHead - (!this.isHorizontalBoat ? i : 0),
        })
      )
        return false;
    }

    return this.cellHover !== undefined && !this.cellIsOccupied(this.cellHover);
  }

  cellIsOccupied(cell: Coordinate): boolean {
    for (let iGB = 0; iGB < this.boatOnGridList.length; iGB++) {
      const boat = this.boatOnGridList[iGB];

      for (let i = 0; i < boat.boatModel.size; i++) {
        const xBoat = boat.xHead - (boat.isHorizontal ? i : 0);
        const yBoat = boat.yHead - (!boat.isHorizontal ? i : 0);

        if (xBoat === cell.x && yBoat === cell.y) {
          return true;
        }
      }
    }

    return false;
  }

  getXBoatHead(cell: Coordinate, boat: Boat, isHorizontalBoat: boolean) {
    return isHorizontalBoat ? Math.max(cell.x, boat.size - 1) : cell.x;
  }

  getYBoatHead(cell: Coordinate, boat: Boat, isHorizontalBoat: boolean) {
    return !isHorizontalBoat ? Math.max(cell.y, boat.size - 1) : cell.y;
  }

  cellIsInTheBoatRange(cell: Coordinate): boolean {
    return (
      this.cellHover !== undefined &&
      this.selectedBoat !== undefined &&
      ((this.isHorizontalBoat &&
        Math.max(this.cellHover.x, this.selectedBoat.size - 1) >= cell.x &&
        Math.max(this.cellHover.x, this.selectedBoat.size - 1) <=
          cell.x + this.selectedBoat.size - 1) ||
        (!this.isHorizontalBoat && this.cellHover.x === cell.x)) &&
      ((!this.isHorizontalBoat &&
        Math.max(this.cellHover.y, this.selectedBoat.size - 1) >= cell.y &&
        Math.max(this.cellHover.y, this.selectedBoat.size - 1) <=
          cell.y + this.selectedBoat.size - 1) ||
        (this.isHorizontalBoat && this.cellHover.y === cell.y))
    );
  }

  @HostListener("document:keydown.space", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.isHorizontalBoat = !this.isHorizontalBoat;
  }
}
