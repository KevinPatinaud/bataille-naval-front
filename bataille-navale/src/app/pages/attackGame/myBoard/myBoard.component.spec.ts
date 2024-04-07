import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from "@angular/core/testing";
import { MyBoardComponent } from "./myBoard.component";
import { GameService } from "src/app/services/game/game.service";
import { EventEmitter } from "@angular/core";
import { Cell } from "src/app/models/cell";
import Boat from "src/app/models/boat";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { By } from "@angular/platform-browser";
import { Coordinate } from "src/app/models/coordinate";
import { BoatDescription } from "src/app/models/boatDescription";
import { BoatPosition } from "src/app/models/boatPosition";
import { BoatType } from "src/app/locales/boats";

jest.mock("src/app/services/game/game.service");

describe("MyBoardComponent", () => {
  const mockGameService = {} as GameService;
  beforeEach(async () => {
    mockGameService.opponentRevealedCellsEvent = new EventEmitter();
    mockGameService.mineRevealedCellsEvent = new EventEmitter();
    mockGameService.opponentBoatsStatesUpdateEvent = new EventEmitter();
    mockGameService.endGameEvent = new EventEmitter();

    await TestBed.configureTestingModule({
      declarations: [MyBoardComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();
  });

  it("should be create ", () => {
    const fixture = TestBed.createComponent(MyBoardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("count number of cell", fakeAsync(() => {
    const fixture = TestBed.createComponent(MyBoardComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const cells = fixture.debugElement.queryAll(By.css("div.cell"));
    expect(cells.length).toBe(100);
    const clouds = fixture.debugElement.queryAll(By.css("img.cloudCell"));
    expect(clouds.length).toBe(100);
    const boats = fixture.debugElement.queryAll(By.css("img.boatCellHide"));
    expect(boats.length).toBe(0);

    mockGameService.mineRevealedCellsEvent.emit([
      {
        coordinate: { x: 1, y: 2 } as Coordinate,
        isOccupied: false,
        isRevealed: true,
      } as Cell,
    ]);

    tick();
    fixture.detectChanges();

    expect(component.revealedCells.length).toBe(1);
    const afterClouds = fixture.debugElement.queryAll(By.css("img.cloudCell"));
    expect(afterClouds.length).toBe(99);
  }));

  it("cell is occupied when there is a horizontal boat on it", () => {
    const fixture = TestBed.createComponent(MyBoardComponent);
    const component = fixture.componentInstance;
    component.myBoats = [
      {
        boatDescription: {
          type: BoatType.Croiseur,
          size: 3,
          image: "",
        } as BoatDescription,
        boatPosition: {
          xHead: 1,
          yHead: 8,
          isHorizontal: true,
        } as BoatPosition,
      } as Boat,
    ];
    fixture.detectChanges();
    expect(component.isCellOccupied({ x: 3, y: 8 } as Coordinate)).toBe(true);
  });

  it("cell is occupied when there is a vertical boat on it", () => {
    const fixture = TestBed.createComponent(MyBoardComponent);
    const component = fixture.componentInstance;
    component.myBoats = [
      {
        boatDescription: {
          type: BoatType.Croiseur,
          size: 3,
          image: "",
        } as BoatDescription,
        boatPosition: {
          xHead: 7,
          yHead: 1,
          isHorizontal: false,
        } as BoatPosition,
      } as Boat,
    ];
    fixture.detectChanges();
    expect(component.isCellOccupied({ x: 7, y: 2 } as Coordinate)).toBe(true);
  });
});
