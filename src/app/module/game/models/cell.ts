import { Coordinate } from "./coordinate";

export interface Cell {
  coordinate: Coordinate;
  isOccupied: boolean;
  isRevealed: boolean;
}
