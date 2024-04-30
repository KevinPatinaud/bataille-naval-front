import { Component, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { GameService } from "../../../services/game/game.service";
import { Cell } from "../../../models/cell";
import Boat from "../../../models/boat";

@Component({
  selector: "app-my-board",
  templateUrl: "./myBoard.component.html",
  styleUrls: ["./myBoard.component.css"],
})
export class MyBoardComponent {
  subscription: Subscription;
  grid: Cell[][] = Array.from({ length: 10 }, () =>
    Array(10).fill({ isRevealed: false } as Cell),
  );
  @Input() myBoats: Boat[] | undefined;

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.mineCellsUpdateEvent.subscribe(
      (grid: Cell[][]) => {
        this.grid = grid;
      },
    );
  }
  ngOnInit() {}

  isCellOccupied(x: number, y: number) {
    if (!this.myBoats) return false;

    return (
      this.myBoats.filter((boat: Boat) => {
        if (boat.boatPosition) {
          if (
            boat.boatPosition.isHorizontal &&
            x >= boat.boatPosition.xHead &&
            x < boat.boatPosition.xHead + boat.boatDescription.size &&
            y === boat.boatPosition.yHead
          ) {
            return true;
          }

          if (
            !boat.boatPosition.isHorizontal &&
            x === boat.boatPosition.xHead &&
            y >= boat.boatPosition.yHead &&
            y < boat.boatPosition.yHead + boat.boatDescription.size
          ) {
            return true;
          }
        }

        return false;
      }).length >= 1
    );
  }
}
