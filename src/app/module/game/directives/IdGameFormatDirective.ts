import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appIdGameFormat]",
})
export class IdGameFormatDirective {
  constructor() {}

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    const pattern = /^[a-zA-Z0-9-_]$/;
    if (!pattern.test(event.key) && !this.isControlKey(event)) {
      event.preventDefault();
    }
  }

  private isControlKey(event: KeyboardEvent): boolean {
    const controlKeys = [
      "Backspace",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];
    return controlKeys.includes(event.key);
  }
}
