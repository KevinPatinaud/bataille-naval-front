import { InjectionToken, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { GameEngineComponent } from "./pages/gameEngine/gameEngine.component";
import { PlacementComponent } from "./pages/placement/placement.component";
import { BoatSelectorComponent } from "./pages/placement/components/boatSelector/boatSelector.component";
import { GridPlacementComponent } from "./pages/placement/components/gridPlacement/gridPlacement.component";
import { AnimationLetsGoComponent } from "./components/animation_new_game/animationLetsGo.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AttackGameComponent } from "./pages/attackGame/attackGame.component";
import { OpponentBoardComponent } from "./pages/attackGame/opponentBoard/opponentBoard.component";
import { AnimationWinComponent } from "./components/animation_win/animationWin.component";
import { MyBoardComponent } from "./pages/attackGame/myBoard/myBoard.component";
import { HttpClientModule } from "@angular/common/http";
import { OpponentBoatsStatesComponent } from "./pages/attackGame/opponentBoatsStates/opponentBoatsStates.component";
import { AnimationLoseComponent } from "./components/animation_lose/animationLose.component";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { BoatSelectorImgComponent } from "./pages/placement/components/boatSelectorImg/boatSelectorImg.component";
import { GameModeComponent } from "./pages/gameMode/gameMode.component";
import { MultiPlayerOptionBoxComponent } from "./pages/gameMode/components/multiplayerOptionBox.component";
import { InscriptionComponent } from "./pages/inscription/inscription.component";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ForceUppercaseDirective } from "./directives/ForceUppercaseDirective";
import { ForceUrlFormatDirective } from "./directives/ForceUrlFormatDirective";
import { IdGameFormatDirective } from "./directives/IdGameFormatDirective";


export const API_BASE_URL_TOKEN = new InjectionToken<string>("api base url");

@NgModule({
  declarations: [
    AppComponent,
    ForceUppercaseDirective,
    ForceUrlFormatDirective,
    IdGameFormatDirective,
    InscriptionComponent,
    GameEngineComponent,
    GameModeComponent,
    MultiPlayerOptionBoxComponent,
    PlacementComponent,
    BoatSelectorComponent,
    BoatSelectorImgComponent,
    GridPlacementComponent,
    AnimationLetsGoComponent,
    AttackGameComponent,
    OpponentBoardComponent,
    AnimationWinComponent,
    AnimationLoseComponent,
    MyBoardComponent,
    OpponentBoatsStatesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkDrag,
    FormsModule,
  ],
  providers: [
    { provide: API_BASE_URL_TOKEN, useValue: "http://" + window.location.hostname + ":8080" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
