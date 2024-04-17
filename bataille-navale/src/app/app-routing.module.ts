import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameEngineComponent } from "./module/game/pages/gameEngine/gameEngine.component";
import { InscriptionComponent } from "./module/game/pages/inscription/inscription.component";

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
