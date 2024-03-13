import { Injectable } from "@angular/core";
import { Coordinate } from "src/app/models/coordinate";

@Injectable({
  providedIn: "root",
})
export class OpponentService {
  constructor() {}

  conter = 0;

  attackCell(coordinate: Coordinate) {
    // return true if a boat was touched
    this.conter++;
    return coordinate.x < 2;
  }

  isAllOpponentBoatDestroyed() {
    return this.conter > 5;
  }
}
