import { EventEmitter, Injectable } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";
import { WebSocketService } from "../websocket/webSocket.service";
import { Subscription } from "rxjs";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { RestService } from "../rest/rest.service";
import Boat from "src/app/models/boat";
import BoatMapper from "./mappers/Boat.mapper";
import { CellDto } from "./dto/cell.dto";
import { PlayerCellsDto } from "./dto/playerCells.dto";
import { Cell } from "src/app/models/cell";
import CellMapper from "./mappers/Cell.mapper";

@Injectable({
  providedIn: "root",
})
export class GameService {
  opponentRevealedCellsEvent: EventEmitter<Cell[]> = new EventEmitter();
  mineRevealedCellsEvent: EventEmitter<Cell[]> = new EventEmitter();
  opponentBoatsStatesUpdateEvent: EventEmitter<Boat[]> = new EventEmitter();
  endGameEvent: EventEmitter<StatusEndGame> = new EventEmitter();

  idPlayer = "";
  idGame = "";
  websocketConnector: any;

  constructor(
    private restService: RestService,
    private webSocketService: WebSocketService
  ) {
    this.init();
  }

  init() {
    const that = this;

    that.restService.get("new-game").subscribe((data: any) => {
      console.log("id de la nouvelle partie :");
      console.log(data.idGame);
      that.idGame = data.idGame;
      that.idPlayer = "PLAYER_1";

      if (that.webSocketService.connectionIsWorking()) {
        that.webSocketService.forceDeconnection();
      }

      setInterval(() => {
        if (!that.webSocketService.connectionIsWorking()) {
          that.webSocketService.forceDeconnection();
          that.initWebsocketConnection();
        }
      }, 3000);
    });
  }

  initWebsocketConnection() {
    const that = this;
    this.webSocketService.connect(function (frame: any) {
      that.webSocketService.subscribe(
        "/diffuse/" + that.idGame + "/revealedCells",
        (message: any) => {
          // récupère l'id du joueur dont la grille est révélée, la liste des cellules révélées et leur contenus

          const playerCells = JSON.parse(message.body) as PlayerCellsDto;
          console.log(playerCells);

          // si il s'agit de la grille adverse
          if (playerCells.idPlayer !== that.idPlayer) {
            that.opponentRevealedCellsEvent.emit(
              CellMapper.fromDtos(playerCells.cells)
            );
          } else {
            that.mineRevealedCellsEvent.emit(
              CellMapper.fromDtos(playerCells.cells)
            );
          }
        }
      );
      that.webSocketService.subscribe(
        "/diffuse/" + that.idGame + "/boatsStates",
        (message: any) => {
          const opponentBoats = JSON.parse(message.body);
          console.log("boat states :");
          console.log(opponentBoats);
          if (opponentBoats.idPlayer !== that.idPlayer) {
            that.opponentBoatsStatesUpdateEvent.emit(
              BoatMapper.fromDtos(opponentBoats.boatsStates)
            );
          }
        }
      );
      that.webSocketService.subscribe(
        "/diffuse/" + that.idGame + "/endGame",
        (message: any) => {
          const messageJs = JSON.parse(message.body);
          console.log("end game :");
          console.log(messageJs);
          if (that.idPlayer === messageJs.idPlayerWin) {
            that.endGameEvent.emit(StatusEndGame.WIN);
          } else {
            that.endGameEvent.emit(StatusEndGame.LOSE);
          }
        }
      );
    });
  }

  submitBoatsPositions(boats: Boat[]) {
    this.webSocketService.send(
      "/action/" + this.idGame + "/submit-boat/" + this.idPlayer,
      JSON.stringify(BoatMapper.gridBoatstoDtos(boats))
    );
  }

  attackCell(coordinate: Coordinate) {
    this.webSocketService.send(
      "/action/" + this.idGame + "/attack/" + this.idPlayer,
      JSON.stringify(coordinate)
    );
  }
}
