import { NgModule } from "@angular/core";
import { GameEngineComponent } from "./pages/gameEngine/gameEngine.component";
import { InscriptionComponent } from "./pages/inscription/inscription.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "game", component: GameEngineComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "", redirectTo: "/game", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
