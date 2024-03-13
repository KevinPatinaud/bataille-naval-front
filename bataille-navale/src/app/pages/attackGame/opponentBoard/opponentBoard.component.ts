import { Component, EventEmitter, Output } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";
import { OpponentService } from "src/app/services/opponent/opponent.service";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  gridCells = [] as CellOpponentBoard[][];

  @Output() allOpponentBoatDestroyedEvent = new EventEmitter();
  @Output() attackLaunchedEvent = new EventEmitter();

  constructor(private opponentService: OpponentService) {}

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
    //---------------------------------------------------------------------------------------------------------------------------
    // Todo interroger le serveur pour savoir si la case est occupée par l'opposant
    this.gridCells[coordinate.x][coordinate.y].isOccupiedByOpponent =
      this.opponentService.attackCell(coordinate);

    this.attackLaunchedEvent.emit();

    if (this.opponentService.isAllOpponentBoatDestroyed()) {
      this.allOpponentBoatDestroyedEvent.emit();
    }
    //---------------------------------------------------------------------------------------------------------------------------
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
