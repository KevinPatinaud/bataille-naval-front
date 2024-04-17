import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appForceUrlFormat]",
})
export class ForceUrlFormatDirective {
  @HostListener("input", ["$event"])
  onInput(event: any) {
    event.target.value = event.target.value
      .replace(/\s/g, "")
      .replace(/[^\w\-_]/g, "");
  }
}
