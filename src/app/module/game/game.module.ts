import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnimationLoseComponent } from "./components/animation_lose/animationLose.component";
import { AnimationLetsGoComponent } from "./components/animation_new_game/animationLetsGo.component";
import { AnimationWinComponent } from "./components/animation_win/animationWin.component";
import { ForceUppercaseDirective } from "./directives/ForceUppercaseDirective";
import { ForceUrlFormatDirective } from "./directives/ForceUrlFormatDirective";
import { IdGameFormatDirective } from "./directives/IdGameFormatDirective";
import { AttackGameComponent } from "./pages/attackGame/attackGame.component";
import { MyBoardComponent } from "./pages/attackGame/myBoard/myBoard.component";
import { OpponentBoardComponent } from "./pages/attackGame/opponentBoard/opponentBoard.component";
import { OpponentBoatsStatesComponent } from "./pages/attackGame/opponentBoatsStates/opponentBoatsStates.component";
import { GameEngineComponent } from "./pages/gameEngine/gameEngine.component";
import { MultiPlayerOptionBoxComponent } from "./pages/gameMode/components/multiplayerOptionBox.component";
import { GameModeComponent } from "./pages/gameMode/gameMode.component";
import { BoatSelectorComponent } from "./pages/placement/components/boatSelector/boatSelector.component";
import { BoatSelectorImgComponent } from "./pages/placement/components/boatSelectorImg/boatSelectorImg.component";
import { GridPlacementComponent } from "./pages/placement/components/gridPlacement/gridPlacement.component";
import { PlacementComponent } from "./pages/placement/placement.component";
import { CdkDrag } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./pages/gameEngine/components/header.component";
import { MenuComponent } from "../user/pages/menu/menu.component";
import { UserModule } from "../user/user.module";
import { CoreModule } from "../core/core.module";

const routes: Routes = [{ path: "", component: GameEngineComponent }];

@NgModule({
  declarations: [
    ForceUppercaseDirective,
    ForceUrlFormatDirective,
    IdGameFormatDirective,
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
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    CdkDrag,
    FormsModule,
    RouterModule.forChild(routes),
    UserModule,
    CoreModule,
  ],
})
export class GameModule {}
