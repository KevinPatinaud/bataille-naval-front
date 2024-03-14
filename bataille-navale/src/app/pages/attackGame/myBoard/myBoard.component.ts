import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { OpponentService } from "src/app/services/opponent/opponent.service";
import { WebSocketService } from "src/app/services/websocket/WebSocketService";

@Component({
  selector: "app-my-board",
  templateUrl: "./myBoard.component.html",
  styleUrls: ["./myBoard.component.css"],
})
export class MyBoardComponent {
  subscription: Subscription;
  message = "";

  constructor(private opponentService: OpponentService) {
    this.subscription = this.opponentService.mineRevealedCellsEvent.subscribe(
      (data) => {
        this.message = data;

        console.log("myBoard :");
        console.log(this.message);
      }
    );
  }
  ngOnInit() {}
}
