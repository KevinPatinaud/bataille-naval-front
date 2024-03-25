import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { StatusEndGame } from "src/app/locales/statusEndGame";
import { GameService } from "src/app/services/game/game.service";
import { AttackGameComponent } from "./attackGame.component";

// Création d'un mock pour GameService
class MockGameService {
  // Utiliser 'of()' pour simuler une valeur observable qui sera retournée immédiatement
  endGameEvent = of(StatusEndGame.WIN);
}

describe("AttackGameComponent", () => {
  let component: AttackGameComponent;
  let fixture: ComponentFixture<AttackGameComponent>;
  let mockGameService: MockGameService;

  beforeEach(async () => {
    mockGameService = new MockGameService();

    await TestBed.configureTestingModule({
      declarations: [AttackGameComponent],
      // Give the mock instead of the true service
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AttackGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("shoud be create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit onGameFinishedEvent with the good state", () => {
    jest.spyOn(component.onGameFinishedEvent, "emit");

    // The mocked service emit directly, so we check only after un little task
    fixture.whenStable().then(() => {
      expect(component.onGameFinishedEvent.emit).toHaveBeenCalledWith(
        StatusEndGame.WIN
      );
    });
  });
});
