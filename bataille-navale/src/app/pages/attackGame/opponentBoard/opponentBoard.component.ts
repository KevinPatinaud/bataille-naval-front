import { Component, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Cell } from "src/app/models/cell";
import { Coordinate } from "src/app/models/coordinate";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  subscription: Subscription;
  revealedCells = [] as Cell[];

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.opponentRevealedCellsEvent.subscribe(
      (revealedCells: Cell[]) => {
        console.log("opponentBoard :");
        console.log(revealedCells);
        this.revealedCells = revealedCells;
      }
    );
  }
  onCellSelected(coordinate: Coordinate) {
    if (!this.isCellRevealed(coordinate)) {
      this.gameService.attackCell(coordinate);
    }
  }

  isCellRevealed(coordinate: Coordinate) {
    return (
      this.revealedCells.filter(
        (cell: Cell) =>
          cell.coordinate.x === coordinate.x &&
          cell.coordinate.y === coordinate.y
      ).length >= 1
    );
  }

  isCellOccupied(coordinate: Coordinate) {
    return this.revealedCells.find(
      (cell: Cell) =>
        cell.coordinate.x === coordinate.x && cell.coordinate.y === coordinate.y
    )?.isOccupied;
  }
}
