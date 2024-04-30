import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "user-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent {
  @Output() closeMenuEvent: EventEmitter<any> = new EventEmitter();

  subscriptionMode = false;

  constructor() {}

  closeMenu() {
    this.closeMenuEvent.emit();
  }

  userConnected() {}

  switchConnexionSubscription() {
    this.subscriptionMode = ! this.subscriptionMode;
  }
}
