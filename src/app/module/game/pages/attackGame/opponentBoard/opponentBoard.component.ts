import { Component, EventEmitter, Output } from "@angular/core";
import { GameService } from "../../../services/game/game.service";
import { GameMode } from "../../../locales/gameMode";
import { Cell } from "../../../models/cell";
import { Coordinate } from "../../../models/coordinate";

@Component({
  selector: "app-opponent-board",
  templateUrl: "./opponentBoard.component.html",
  styleUrls: ["./opponentBoard.component.css"],
})
export class OpponentBoardComponent {
  grid: Cell[][] = Array.from({ length: 10 }, () =>
    Array(10).fill({ isRevealed: false } as Cell),
  );
  isMyTurn = false;
  isGameModeMulti: boolean;

  constructor(private gameService: GameService) {
    this.isMyTurn = gameService.getIdPlayer() === "PLAYER_1";
    this.isGameModeMulti = gameService.getGameMode() === GameMode.MULTI;
  }

  ngOnInit() {
    const that = this;
    this.gameService.opponentCellsUpdateEvent.subscribe((grid: Cell[][]) => {
      this.grid = grid;
    });
    this.gameService.playerTurnUpdateEvent.subscribe((idPlayerTurn: string) => {
      that.isMyTurn = that.gameService.getIdPlayer() === idPlayerTurn;
      console.log("isMyTurn : " + that.isMyTurn);
    });
  }
  onCellSelected(coordinate: Coordinate) {
    if (!this.grid[coordinate.x][coordinate.y].isRevealed) {
      this.gameService.attackCell(coordinate);
    }
  }
}
