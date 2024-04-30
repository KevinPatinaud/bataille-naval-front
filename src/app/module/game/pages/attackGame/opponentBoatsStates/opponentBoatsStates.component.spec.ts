import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of, Subscription } from "rxjs";
import { OpponentBoatsStatesComponent } from "./opponentBoatsStates.component";
import { GameService } from "src/app/services/game/game.service";

class MockGameService {
  opponentBoatsStatesUpdateEvent = of([
    { boatDescription: "Croiseur", boatState: { isDestroyed: true } },
  ]);
}

describe("OpponentBoatsStatesComponent", () => {
  let component: OpponentBoatsStatesComponent;
  let fixture: ComponentFixture<OpponentBoatsStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpponentBoatsStatesComponent],
      providers: [{ provide: GameService, useClass: MockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(OpponentBoatsStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.subscription.unsubscribe();
  });

  it("should be create", () => {
    expect(component).toBeTruthy();
  });

  it("should update opponent boat in response of service event", (done) => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.opponentBoats).toEqual([
        { boatDescription: "Croiseur", boatState: { isDestroyed: true } },
      ]);
      done();
    });
  });
});
