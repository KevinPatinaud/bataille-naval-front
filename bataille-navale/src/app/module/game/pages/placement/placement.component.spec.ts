import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PlacementComponent } from "./placement.component";
import { GameService } from "src/app/services/game/game.service";
import { BoatDescription } from "src/app/models/boatDescription";
import Boat from "src/app/models/boat";
import { BoatType } from "src/app/locales/boats";
import { BoatPosition } from "src/app/models/boatPosition";

// Mock GameService
class MockGameService {
  submitBoatsPositions = jest.fn();
}

describe("PlacementComponent", () => {
  let component: PlacementComponent;
  let fixture: ComponentFixture<PlacementComponent>;
  let mockGameService: MockGameService;

  beforeEach(async () => {
    mockGameService = new MockGameService();

    await TestBed.configureTestingModule({
      declarations: [PlacementComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should handle boat selection", () => {
    const testBoat: BoatDescription = {
      type: BoatType.PorteAvion,
      size: 5,
      image: "image",
    };
    component.onBoatSelected(testBoat);
    expect(component.selectedBoat).toEqual(testBoat);
  });

  it("should update on grid boats when the grid is updated", () => {
    const testBoats: Boat[] = [
      {
        boatDescription: {
          type: BoatType.PorteAvion,
          size: 5,
          image: "image",
        } as BoatDescription,
        boatPosition: {} as BoatPosition,
      },
    ];
    component.onGridUpdate(testBoats);
    expect(component.onGridBoats).toEqual(testBoats);
  });

  it("should submit boat positions and emit event on last boat placement", () => {
    // Spy on the event emitter to verify it gets called
    jest.spyOn(component.onAllBoatAreDisposeEvent, "emit");

    const testBoats: Boat[] = [
      {
        boatDescription: {
          type: BoatType.PorteAvion,
          size: 5,
          image: "image",
        } as BoatDescription,
        boatPosition: {} as BoatPosition,
      },
    ];
    component.onGridUpdate(testBoats);
    component.onLastBoatSelected(); // Set the flag to true
    component.onBoatSelectedIsPlacedOnTheGrid(); // Attempt to submit and emit

    expect(mockGameService.submitBoatsPositions).toHaveBeenCalledWith(
      testBoats,
    );
    expect(component.onAllBoatAreDisposeEvent.emit).toHaveBeenCalledWith(
      testBoats,
    );
  });
});
