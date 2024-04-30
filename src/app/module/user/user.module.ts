import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./pages/menu/menu.component";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { SubscriptionComponent } from "./pages/menu/components/subscription/subscription.component";
import { ConnexionComponent } from "./pages/menu/components/connexion/connexion.component";
import { EmailValidatorDirective } from "./directives/email-validator.directive";

/*
const routes: Routes = [
  { path: "connection", component: ConnectionComponent },
  { path: "inscription", component: InscriptionComponent },
];
*/

@NgModule({
  declarations: [MenuComponent, ConnexionComponent, SubscriptionComponent , EmailValidatorDirective ],
  imports: [
    CommonModule,
    FormsModule,
    /* RouterModule.forChild(routes) ,*/
    CoreModule,
  ],
  exports: [MenuComponent],
})
export class UserModule {}
