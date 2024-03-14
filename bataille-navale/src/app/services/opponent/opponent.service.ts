import { EventEmitter, Injectable } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";
import { WebSocketService } from "../websocket/WebSocketService";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OpponentService {
  opponentRevealedCellsEvent: EventEmitter<any> = new EventEmitter();
  mineRevealedCellsEvent: EventEmitter<any> = new EventEmitter();

  myPlayerId = "player_1";

  constructor(private webSocketService: WebSocketService) {
    const that = this;
    this.webSocketService.connect(function (frame: any) {
      that.webSocketService.subscribe("revealedCells", (message: any) => {
        // récupère l'id du joueur dont la grille est révélée, la liste des cellules révélées et leur contenus

        const messageJs = JSON.parse(message.body);
        console.log(messageJs);

        // si il s'agit de la grille adverse
        that.opponentRevealedCellsEvent.emit(messageJs.cells);

        // si il s'agit de ma grille
        //        that.mineRevealedCellsEvent.emit(messageJs.cells);
      });
    });
  }

  counter = 0;

  attackCell(coordinate: Coordinate) {
    this.webSocketService.send("attack", JSON.stringify(coordinate));

    this.counter++;
    return coordinate.x < 2;
  }

  isAllOpponentBoatDestroyed() {
    return this.counter > 5;
  }
}
