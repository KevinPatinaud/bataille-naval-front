import { Component, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Coordinate } from "src/app/models/coordinate";
import { OpponentService } from "src/app/services/opponent/opponent.service";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  subscription: Subscription;
  revealedCells = [] as CellOpponentBoard[];

  constructor(private opponentService: OpponentService) {
    this.subscription =
      this.opponentService.opponentRevealedCellsEvent.subscribe(
        (
          revealedCellsServer: { x: number; y: number; cellContent: string }[]
        ) => {
          console.log("opponentBoard :");
          console.log(revealedCellsServer);
          this.revealedCells = [];
          revealedCellsServer.forEach((c) => {
            this.revealedCells.push({
              coordinate: { x: c.x, y: c.y },
              isOccupiedByOpponent: c.cellContent === "BOAT",
            });
          });
        }
      );
  }
  onCellSelected(coordinate: Coordinate) {
    this.opponentService.attackCell(coordinate);
  }

  isCellRevealed(coordinate: Coordinate) {
    return (
      this.revealedCells.filter(
        (cell: CellOpponentBoard) =>
          cell.coordinate.x === coordinate.x &&
          cell.coordinate.y === coordinate.y
      ).length >= 1
    );
  }

  isCellOccupiedByOpponent(coordinate: Coordinate) {
    return this.revealedCells.find(
      (cell: CellOpponentBoard) =>
        cell.coordinate.x === coordinate.x && cell.coordinate.y === coordinate.y
    )?.isOccupiedByOpponent;
  }
}

interface CellOpponentBoard {
  coordinate: Coordinate;
  isOccupiedByOpponent: boolean | undefined;
}
