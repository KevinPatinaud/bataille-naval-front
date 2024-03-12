import { Component } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  gridCells = [] as CellOpponentBoard[][];

  ngOnInit() {
    this.gridCells = [] as CellOpponentBoard[][];

    for (let x = 0; x < 10; x++) {
      const line = [] as CellOpponentBoard[];
      for (let y = 0; y < 10; y++) {
        line.push({
          coordinate: { x: x, y: y },
          isRevealed: false,
          isOccupiedByOpponent: undefined,
        } as CellOpponentBoard);
      }
      this.gridCells.push(line);
    }
  }

  onCellSelected(coordinate: Coordinate) {
    this.gridCells[coordinate.x][coordinate.y].isRevealed = true;

    // Todo interroger le serveur pour savoir si la case est occupée par l'opposant
    this.gridCells[coordinate.x][coordinate.y].isOccupiedByOpponent =
      coordinate.x % 2 === 1;
  }

  isCellRevealed(coordinate: Coordinate) {
    return this.gridCells[coordinate.x][coordinate.y].isRevealed;
  }

  isCellOccupiedByOpponent(coordinate: Coordinate) {
    return this.gridCells[coordinate.x][coordinate.y].isOccupiedByOpponent;
  }
}

interface CellOpponentBoard {
  coordinate: Coordinate;
  isRevealed: boolean;
  isOccupiedByOpponent: boolean | undefined;
}
