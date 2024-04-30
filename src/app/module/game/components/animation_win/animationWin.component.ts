import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "game-animation-win",
  templateUrl: "./animationWin.component.html",
  styleUrls: ["./animationWin.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }), // le style initial de l'élément
        animate("500ms", style({ opacity: 1 })), // l'état final de l'élément
        animate("3s 2s", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AnimationWinComponent {
  @Output() animationFinishedEvent = new EventEmitter<void>();

  animationDone(event: any) {
    // Événement à déclencher après l'animation
    console.log("animation end");
    this.animationFinishedEvent.emit();
  }
}
