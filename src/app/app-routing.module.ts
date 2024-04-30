import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/game", pathMatch: "full" },
  {
    path: "game",
    loadChildren: () =>
      import("./module/game/game.module").then((m) => m.GameModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./module/user/user.module").then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
