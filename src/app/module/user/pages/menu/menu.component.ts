import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "user-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
  @Output() closeMenuEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  closeMenu() {
    this.closeMenuEvent.emit();
  }

  userConnect() {
    throw new Error("Method not implemented.");
  }
}
