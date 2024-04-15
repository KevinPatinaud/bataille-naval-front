import { Component, EventEmitter, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { GameMode } from "src/app/locales/gameMode";
import { Cell } from "src/app/models/cell";
import { Coordinate } from "src/app/models/coordinate";
import { GameService } from "src/app/services/game/game.service";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  revealedCells = [] as Cell[];
  isMyTurn = false;
  isGameModeMulti: boolean;

  constructor(private gameService: GameService) {
    this.isMyTurn = gameService.getIdPlayer() === "PLAYER_1";
    this.isGameModeMulti = gameService.getGameMode() === GameMode.MULTI;
  }

  ngOnInit() {
    const that = this;
    this.gameService.opponentCellsUpdateEvent.subscribe(
      (revealedCells: Cell[]) => {
        console.log("opponentBoard :");
        console.log(revealedCells);
        this.revealedCells = revealedCells;
      }
    );
    this.gameService.playerTurnUpdateEvent.subscribe((idPlayerTurn: string) => {
      that.isMyTurn = that.gameService.getIdPlayer() === idPlayerTurn;
      console.log("isMyTurn : " + that.isMyTurn);
    });
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
          cell.isRevealed &&
          cell.coordinate.x === coordinate.x &&
          cell.coordinate.y === coordinate.y
      ).length >= 1
    );
  }

  isCellOccupied(coordinate: Coordinate) {
    return this.revealedCells.find(
      (cell: Cell) =>
        cell.isOccupied &&
        cell.coordinate.x === coordinate.x &&
        cell.coordinate.y === coordinate.y
    )?.isOccupied;
  }
}
