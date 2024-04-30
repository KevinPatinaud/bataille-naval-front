import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AnimationWinComponent } from "./animationWin.component";

describe("AnimationLoseComponent", () => {
  let component: AnimationWinComponent;
  let fixture: ComponentFixture<AnimationWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimationWinComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit an event at the end", fakeAsync(() => {
    jest.spyOn(component.animationFinishedEvent, "emit");

    component.animationDone({ toState: "void" });

    tick();

    expect(component.animationFinishedEvent.emit).toHaveBeenCalled();
  }));
});
