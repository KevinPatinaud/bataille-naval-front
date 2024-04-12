import { Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameEngineComponent } from "./pages/gameEngine/gameEngine.component";
import { InscriptionComponent } from "./pages/inscription/inscription.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [],
})
export class AppComponent {
  title = "bataille-navale";
}
