
import { Cell } from "../../../models/cell";
import { Coordinate } from "../../../models/coordinate";
import { CellDto } from "../dto/cell.dto";

export default class CellMapper {
  static fromDtos(cells: CellDto[]): Cell[][] {

    let grid: Cell[][] = Array.from({ length: 10 }, () => Array(10).fill(null));


    cells.map((c) => this.fromDto(c)).sort((c1 , c2) => {
    if (c1.coordinate.x === c2.coordinate.x) {
      return c1.coordinate.y - c2.coordinate.y;
    }
    return c1.coordinate.x - c2.coordinate.x;
  })
  .forEach(cell => {
    grid[cell.coordinate.x][cell.coordinate.y] = cell;
});

return grid;
}

  static fromDto(cell: CellDto): Cell {
    return {
      coordinate: { x: cell.x, y: cell.y } as Coordinate,
      isOccupied: cell.cellContent === "BOAT",
      isRevealed: cell.isRevealed,
    } as Cell;
  }
}
