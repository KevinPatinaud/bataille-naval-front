import { EventEmitter } from "@angular/core";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GameService } from "src/app/services/game/game.service";
import { OpponentBoardComponent } from "./opponentBoard.component";
import { By } from "@angular/platform-browser";
import { Coordinate } from "src/app/models/coordinate";
import { Cell } from "src/app/models/cell";

jest.mock("src/app/services/game/game.service");

describe("MyBoardComponent", () => {
  const mockGameService = {} as GameService;
  beforeEach(async () => {
    mockGameService.opponentRevealedCellsEvent = new EventEmitter();
    mockGameService.mineRevealedCellsEvent = new EventEmitter();
    mockGameService.opponentBoatsStatesUpdateEvent = new EventEmitter();
    mockGameService.endGameEvent = new EventEmitter();

    await TestBed.configureTestingModule({
      declarations: [OpponentBoardComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();
  });

  it("should be create", () => {
    const fixture = TestBed.createComponent(OpponentBoardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it("count number of cell", fakeAsync(() => {
    const fixture = TestBed.createComponent(OpponentBoardComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const cells = fixture.debugElement.queryAll(By.css("div.cell"));
    expect(cells.length).toBe(100);
    const clouds = fixture.debugElement.queryAll(
      By.css("img.notRevealedCells"),
    );
    expect(clouds.length).toBe(100);

    mockGameService.opponentRevealedCellsEvent.emit([
      {
        coordinate: { x: 1, y: 2 } as Coordinate,
        isOccupied: false,
        isRevealed: true,
      } as Cell,
    ]);

    tick();
    fixture.detectChanges();

    expect(component.revealedCells.length).toBe(1);
    const afterClouds = fixture.debugElement.queryAll(
      By.css("img.notRevealedCells"),
    );
    expect(afterClouds.length).toBe(99);
  }));

  it("attackcell", () => {
    const fixture = TestBed.createComponent(OpponentBoardComponent);
    const component = fixture.componentInstance;
    mockGameService.attackCell = jest.fn();
    fixture.detectChanges();
    component.onCellSelected({ x: 4, y: 6 });
    expect(mockGameService.attackCell).toHaveBeenCalledWith({ x: 4, y: 6 });
  });
});
