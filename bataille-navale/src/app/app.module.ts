import { InjectionToken, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { GameModule } from "./module/game/game.module";

@NgModule({
  imports: [
    AppRoutingModule,
    GameModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
