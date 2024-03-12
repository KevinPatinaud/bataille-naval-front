import { Component, EventEmitter, HostListener, Output } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "app-animation-new-game",
  templateUrl: "./animationNewGame.component.html",
  styleUrls: ["./animationNewGame.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }), // le style initial de l'élément
        animate("300ms", style({ opacity: 1 })), // l'état final de l'élément
        animate("2s 500ms", style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AnimationNewGameComponent {
  @Output() animationFinishedEvent = new EventEmitter<void>();

  animationDone(event: any) {
    // Événement à déclencher après l'animation
    console.log("animation end");
    this.animationFinishedEvent.emit();
  }
}
