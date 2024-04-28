import { InjectionToken, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { GameModule } from "./module/game/game.module";
import { CoreModule } from "./module/core/core.module";



export const API_BASE_URL_TOKEN = new InjectionToken<string>("api base url");

@NgModule({
  imports: [
    AppRoutingModule,
    CoreModule,
    GameModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: API_BASE_URL_TOKEN, useValue: "http://" + window.location.hostname + ":8080" }
  ]
})
export class AppModule {}
