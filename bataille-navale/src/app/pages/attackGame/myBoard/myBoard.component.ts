import { Component } from "@angular/core";
import { Subscription } from "rxjs";
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
  message = "";

  constructor(private gameService: GameService) {
    this.subscription = this.gameService.mineRevealedCellsEvent.subscribe(
      (data: any) => {
        this.message = data;

        console.log("myBoard :");
        console.log(this.message);
      }
    );
  }
  ngOnInit() {}
}
