import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AnimationLoseComponent } from "./animationLose.component";

describe("AnimationLoseComponent", () => {
  let component: AnimationLoseComponent;
  let fixture: ComponentFixture<AnimationLoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimationLoseComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationLoseComponent);
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
