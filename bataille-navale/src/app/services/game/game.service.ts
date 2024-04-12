import { EventEmitter, Injectable } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";
import { WebSocketService } from "../websocket/webSocket.service";
import { Observable, Subscription, map } from "rxjs";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { RestService } from "../rest/rest.service";
import Boat from "src/app/models/boat";
import BoatMapper from "./mappers/Boat.mapper";
import { CellDto } from "./dto/cell.dto";
import { PlayerCellsDto } from "./dto/playerCells.dto";
import { Cell } from "src/app/models/cell";
import CellMapper from "./mappers/Cell.mapper";
import { GameMode } from "src/app/locales/gameMode";

@Injectable({
  providedIn: "root",
})
export class GameService {
  opponentRevealedCellsEvent: EventEmitter<Cell[]> = new EventEmitter();
  mineRevealedCellsEvent: EventEmitter<Cell[]> = new EventEmitter();
  opponentBoatsStatesUpdateEvent: EventEmitter<Boat[]> = new EventEmitter();
  endGameEvent: EventEmitter<StatusEndGame> = new EventEmitter();

  serverUrlREST = "http://" + window.location.hostname + ":8080";

  idGame = "";
  idPlayer = "";
  websocketConnector: any;

  constructor(
    private restService: RestService,
    private webSocketService: WebSocketService
  ) {}

  isGameWaitingSecondPlayer(idGame: string) {
    return this.restService.get(
      this.serverUrlREST + "/game/" + idGame + "/iswaitingsecondplayer"
    );
  }

  generateNewGame(gameMode: GameMode) {
    const that = this;

    const newGame$ = that.restService.post(this.serverUrlREST + "/game/", {
      mode: gameMode,
    });

    newGame$.subscribe((data: any) => {
      that.idGame = data.id;
      that.idPlayer = "PLAYER_1";

      this.launchWebsocketConnection();
    });

    return newGame$.pipe(
      map((data) => {
        return data.id;
      })
    );
  }

  joinGame(idGame: string) {
    this.idGame = idGame;
    this.idPlayer = "PLAYER_2";

    const that = this;

    const newGame$ = that.restService.put(
      this.serverUrlREST + "/game/" + idGame + "/join",
      {}
    );

    newGame$.subscribe((data: any) => {
      this.launchWebsocketConnection();
    });
  }

  launchWebsocketConnection() {
    if (this.webSocketService.connectionIsWorking()) {
      this.webSocketService.forceDeconnection();
    }

    setInterval(() => {
      if (!this.webSocketService.connectionIsWorking()) {
        this.webSocketService.forceDeconnection();
        this.initWebsocketConnection(this.idGame);
      }
    }, 3000);
  }

  initWebsocketConnection(idGame: string) {
    const that = this;
    this.webSocketService.connect(function (frame: any) {
      that.webSocketService.subscribe(
        "/diffuse/" + idGame + "/grid",
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
        "/diffuse/" + idGame + "/boats",
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
        "/diffuse/" + idGame + "/endGame",
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
    const that = this;
    this.webSocketService.send(
      "/action/" + that.idGame + "/submit-boat/" + this.idPlayer,
      JSON.stringify(BoatMapper.gridBoatstoDtos(boats))
    );
  }

  attackCell(coordinate: Coordinate) {
    const that = this;
    this.webSocketService.send(
      "/action/" + that.idGame + "/attack/" + this.idPlayer,
      JSON.stringify(coordinate)
    );
  }
}
