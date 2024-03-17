import { Cell } from "src/app/models/cell";
import { CellDto } from "../dto/cell.dto";
import { Coordinate } from "src/app/models/coordinate";

export default class CellMapper {
  static fromDtos(cells: CellDto[]): Cell[] {
    return cells.map((c) => this.fromDto(c));
  }

  static fromDto(cell: CellDto): Cell {
    return {
      coordinate: { x: cell.x, y: cell.y } as Coordinate,
      isOccupied: cell.cellContent === "BOAT",
      isRevealed: cell.isRevealed,
    } as Cell;
  }
}
