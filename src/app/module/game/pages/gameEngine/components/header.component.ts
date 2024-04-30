import { Component } from "@angular/core";

@Component({
  selector: "game-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  displayUserMenu = false;

  openUserMenu() {
    console.log("Open user menu");
    this.displayUserMenu = true;
  }

  closeUserMenu() {
    this.displayUserMenu = false;
  }
}
