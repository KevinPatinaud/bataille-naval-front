import { Component } from "@angular/core";
import { AuthService } from "../../../game/services/user/AuthService ";

@Component({
  selector: "user-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.css"],
})
export class ConnectionComponent {
  constructor(private authService: AuthService) {}
}
