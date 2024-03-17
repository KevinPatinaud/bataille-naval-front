import { NgModule } from "@angular/core";
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

@NgModule({
  declarations: [
    AppComponent,
    GameEngineComponent,
    PlacementComponent,
    BoatSelectorComponent,
    GridPlacementComponent,
    AnimationLetsGoComponent,
    AttackGameComponent,
    OpponentBoardComponent,
    AnimationWinComponent,
    MyBoardComponent,
    OpponentBoatsStatesComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
