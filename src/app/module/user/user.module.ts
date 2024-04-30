import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ConnectionComponent } from "./pages/connection/connection.component";
import { InscriptionComponent } from "./pages/inscription/inscription.component";
import { MenuComponent } from "./pages/menu/menu.component";
import { CoreModule } from "../core/core.module";

const routes: Routes = [
  { path: "connection", component: ConnectionComponent },
  { path: "inscription", component: InscriptionComponent },
];

@NgModule({
  declarations: [MenuComponent],
  imports: [FormsModule, RouterModule.forChild(routes), CoreModule],
  exports: [MenuComponent],
})
export class UserModule {}
