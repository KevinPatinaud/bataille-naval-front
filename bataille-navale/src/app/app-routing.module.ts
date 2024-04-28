import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameEngineComponent } from "./module/game/pages/gameEngine/gameEngine.component";
import { InscriptionComponent } from "./module/game/pages/inscription/inscription.component";

const routes: Routes = [
  { path: "", redirectTo: "/game", pathMatch: "full" },
//  { path: "game",  loadChildren: () => import('./module/game/game.module').then(m => m.GameModule)  },
//  { path: "inscription",  loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)  },
  { path: "game", component: GameEngineComponent },
  { path: "inscription", component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
