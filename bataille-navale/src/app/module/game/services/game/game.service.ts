import { EventEmitter, Inject, Injectable } from "@angular/core";
import { WebSocketService } from "../websocket/webSocket.service";
import { Observable, Subscription, map } from "rxjs";
import BoatMapper from "./mappers/Boat.mapper";
import CellMapper from "./mappers/Cell.mapper";
import { Cell } from "../../models/cell";
import Boat from "../../models/boat";
import { StatusEndGame } from "../../locales/statusEndGame";
import { GameMode } from "../../locales/gameMode";
import { Coordinate } from "../../models/coordinate";
import { GameModule } from "../../game.module";
import { API_BASE_URL_TOKEN } from "src/app/app.module";
import { RestService } from "src/app/module/core/services/rest/rest.service";

@Injectable({
  providedIn: "root",
})
export class GameService {
  playerTurnUpdateEvent: EventEmitter<string> = new EventEmitter();
  opponentCellsUpdateEvent: EventEmitter<Cell[][]> = new EventEmitter();
  mineCellsUpdateEvent: EventEmitter<Cell[][]> = new EventEmitter();
  opponentBoatsUpdateEvent: EventEmitter<Boat[]> = new EventEmitter();
  mineBoatsUpdateEvent: EventEmitter<Boat[]> = new EventEmitter();
  endGameEvent: EventEmitter<StatusEndGame> = new EventEmitter();
  opponentJoinGameEvent: EventEmitter<string> = new EventEmitter();
  opponentPositionBoatDoneEvent: EventEmitter<string> = new EventEmitter();

  idGame = "";
  idPlayer = "";
  gameMode: GameMode | any;
  websocketConnector: any;

  constructor(
    @Inject(API_BASE_URL_TOKEN) public apiBaseURL: string,
    private restService: RestService,
    private webSocketService: WebSocketService,
  ) {}

  getIdGame() {
    return this.idGame;
  }

  getIdPlayer() {
    return this.idPlayer;
  }

  getGameMode() {
    return this.gameMode;
  }

  isGameWaitingSecondPlayer(idGame: string) {
    return this.restService.get(
      this.apiBaseURL + "/game/" + idGame + "/iswaitingsecondplayer",
    );
  }

  generateNewGame(gameMode: GameMode) {
    console.log("generateNewGame()");
    const that = this;

    this.gameMode = gameMode;

    const newGame$ = that.restService.post(this.apiBaseURL + "/game/", {
      mode: gameMode,
    });

    return newGame$.pipe(
      map((game) => {
        that.idGame = game.id;
        console.log(that.idGame);
        that.idPlayer = "PLAYER_1";
        this.launchWebsocketConnection();
        return game.id;
      }),
    );
  }

  joinGame(idGame: string) {
    this.idGame = idGame;
    this.idPlayer = "PLAYER_2";
    this.gameMode = GameMode.MULTI;

    const that = this;

    const newGame$ = that.restService.put(
      this.apiBaseURL + "/game/" + idGame + "/join",
      {},
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
    console.log("initWebsocketConnection()");
    const that = this;
    this.webSocketService.connect(function (frame: any) {
      that.webSocketService.subscribe(
        "/diffuse/" + idGame + "/gameState",
        (message: any) => {
          const gameState = JSON.parse(message.body);
          console.log(gameState);

          that.playerTurnUpdateEvent.emit(gameState.idPlayerTurn);

          const me =
            that.idPlayer === "PLAYER_1"
              ? gameState.player1
              : gameState.player2;

          const opponent =
            that.idPlayer === "PLAYER_1"
              ? gameState.player2
              : gameState.player1;

          that.mineBoatsUpdateEvent.emit(BoatMapper.fromDtos(me.boatsStates));
          that.mineCellsUpdateEvent.emit(CellMapper.fromDtos(me.cells));

          that.opponentBoatsUpdateEvent.emit(
            BoatMapper.fromDtos(opponent.boatsStates),
          );
          that.opponentCellsUpdateEvent.emit(
            CellMapper.fromDtos(opponent.cells),
          );
        },
      );

      that.webSocketService.subscribe(
        "/diffuse/" + idGame + "/endGame",
        (message: any) => {
          const endGameState = JSON.parse(message.body);
          console.log("end game :");
          console.log(endGameState);
          if (endGameState.idPlayerWin === that.idPlayer) {
            that.endGameEvent.emit(StatusEndGame.WIN);
          } else {
            that.endGameEvent.emit(StatusEndGame.LOSE);
          }
        },
      );

      if (that.gameMode === GameMode.MULTI) {
        that.webSocketService.subscribe(
          "/diffuse/" + idGame + "/playerJoin",
          (message: any) => {
            console.log("Le second joueur vient de rejoindre la partie");
            console.log(message);
            that.opponentJoinGameEvent.emit(message);
          },
        );
        that.webSocketService.subscribe(
          "/diffuse/" + idGame + "/playerPositionBoats",
          (message: any) => {
            console.log(message.body);

            const idPlayerPositionBoat = (message.body as string).replaceAll(
              '"',
              "",
            );

            if (!idPlayerPositionBoat.includes(that.idPlayer)) {
              console.log(
                "Le joueur advserse : " +
                  idPlayerPositionBoat +
                  " vient de positionner ses bateaux",
              );
              that.opponentPositionBoatDoneEvent.emit(idPlayerPositionBoat);
            }
          },
        );
      }
    });
  }

  submitBoatsPositions(boats: Boat[]) {
    const that = this;
    this.webSocketService.send(
      "/action/" + that.idGame + "/submit-boat/" + this.idPlayer,
      JSON.stringify(BoatMapper.gridBoatstoDtos(boats)),
    );
  }

  attackCell(coordinate: Coordinate) {
    const that = this;
    this.webSocketService.send(
      "/action/" + that.idGame + "/attack/" + this.idPlayer,
      JSON.stringify(coordinate),
    );
  }

  askGameState() {
    const that = this;
    this.webSocketService.send(
      "/action/" + that.idGame + "/gameState",
      undefined,
    );
  }
}
