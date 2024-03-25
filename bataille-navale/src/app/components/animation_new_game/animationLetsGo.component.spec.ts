import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AnimationLetsGoComponent } from "./animationLetsGo.component";

describe("AnimationLoseComponent", () => {
  let component: AnimationLetsGoComponent;
  let fixture: ComponentFixture<AnimationLetsGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimationLetsGoComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationLetsGoComponent);
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
