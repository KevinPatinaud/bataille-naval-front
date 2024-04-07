import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import Boat from "src/app/models/boat";
import { Cell } from "src/app/models/cell";
import { Coordinate } from "src/app/models/coordinate";
import { CellDto } from "src/app/services/game/dto/cell.dto";
import { GameService } from "src/app/services/game/game.service";
import { WebSocketService } from "src/app/services/websocket/webSocket.service";

@Component({
  selector: "app-my-board",
  templateUrl: "./myBoard.component.html",
  styleUrls: ["./myBoard.component.css"],
})
export class MyBoardComponent {
  subscription: Subscription;
  revealedCells = [] as Cell[];
  @Input() myBoats: Boat[] | undefined;

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.mineRevealedCellsEvent.subscribe(
      (revealedCells: Cell[]) => {
        this.revealedCells = revealedCells;
      }
    );
  }
  ngOnInit() {}

  isCellRevealed(coordinate: Coordinate) {
    return (
      this.revealedCells.filter(
        (cell: Cell) =>
          cell.isRevealed &&
          cell.coordinate.x === coordinate.x &&
          cell.coordinate.y === coordinate.y
      ).length >= 1
    );
  }

  isCellOccupied(coordinate: Coordinate) {
    if (!this.myBoats) return false;

    return (
      this.myBoats.filter((boat: Boat) => {
        if (boat.boatPosition) {
          if (
            boat.boatPosition.isHorizontal &&
            coordinate.x >= boat.boatPosition.xHead &&
            coordinate.x <
              boat.boatPosition.xHead + boat.boatDescription.size &&
            coordinate.y === boat.boatPosition.yHead
          ) {
            return true;
          }

          if (
            !boat.boatPosition.isHorizontal &&
            coordinate.x === boat.boatPosition.xHead &&
            coordinate.y >= boat.boatPosition.yHead &&
            coordinate.y < boat.boatPosition.yHead + boat.boatDescription.size
          ) {
            return true;
          }
        }

        return false;
      }).length >= 1
    );
  }
}
