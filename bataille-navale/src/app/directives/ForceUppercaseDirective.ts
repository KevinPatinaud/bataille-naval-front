import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appForceUppercase]",
})
export class ForceUppercaseDirective {
  @HostListener("input", ["$event"])
  onInput(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
}
