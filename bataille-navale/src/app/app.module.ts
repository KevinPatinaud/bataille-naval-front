import { InjectionToken, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { GameModule } from "./module/game/game.module";
import { CoreModule } from "./module/core/core.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";

export const API_BASE_URL_TOKEN = new InjectionToken<string>("api base url");

@NgModule({
  imports: [
    AppRoutingModule,
    CoreModule,
    GameModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: API_BASE_URL_TOKEN,
      useValue: "http://" + window.location.hostname + ":8080",
    },
  ],
})
export class AppModule {}
