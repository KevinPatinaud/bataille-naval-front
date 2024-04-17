import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from "@angular/core/testing";
import { GameService } from "src/app/services/game/game.service";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { GameEngineComponent } from "./gameEngine.component";

// Mocking GameService
class MockGameService {
  init = jest.fn();
}

describe("GameEngineComponent", () => {
  let component: GameEngineComponent;
  let fixture: ComponentFixture<GameEngineComponent>;
  let mockGameService: MockGameService;

  beforeEach(async () => {
    mockGameService = new MockGameService();

    await TestBed.configureTestingModule({
      declarations: [GameEngineComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should properly initialize state variables", () => {
    expect(component.displayPlacement).toBe(true);
    expect(component.myBoats).toEqual([]);
  });

  it("onAllBoatAreDispose should update the state to display the start animation", fakeAsync(() => {
    component.onAllBoatAreDispose([]);
    tick(500);
    expect(component.displayPlacement).toBe(false);
    expect(component.displayLetsGoAnimation).toBe(true);
  }));

  it("onLetsGoAnimationFinished should display the attack game", () => {
    component.onLetsGoAnimationFinished();
    expect(component.displayLetsGoAnimation).toBe(false);
    expect(component.displayAttackGame).toBe(true);
  });

  it("onGameFinished should display the win or lose animation", fakeAsync(() => {
    component.onGameFinished(StatusEndGame.WIN);
    tick(5000);
    expect(component.displayWinAnimation).toBe(true);

    component.onGameFinished(StatusEndGame.LOSE);
    tick(5000);
    expect(component.displayLoseAnimation).toBe(true);
  }));

  it("onAnimationEndGameResultFinished should reinitialize the component", () => {
    component.onAnimationEndGameResultFinished();
    expect(component.displayPlacement).toBe(true);
    expect(component.myBoats).toEqual([]);
  });
});
