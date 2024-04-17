import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { AnimationLoseComponent } from './components/animation_lose/animationLose.component';
import { AnimationLetsGoComponent } from './components/animation_new_game/animationLetsGo.component';
import { AnimationWinComponent } from './components/animation_win/animationWin.component';
import { ForceUppercaseDirective } from './directives/ForceUppercaseDirective';
import { ForceUrlFormatDirective } from './directives/ForceUrlFormatDirective';
import { IdGameFormatDirective } from './directives/IdGameFormatDirective';
import { AttackGameComponent } from './pages/attackGame/attackGame.component';
import { MyBoardComponent } from './pages/attackGame/myBoard/myBoard.component';
import { OpponentBoardComponent } from './pages/attackGame/opponentBoard/opponentBoard.component';
import { OpponentBoatsStatesComponent } from './pages/attackGame/opponentBoatsStates/opponentBoatsStates.component';
import { GameEngineComponent } from './pages/gameEngine/gameEngine.component';
import { MultiPlayerOptionBoxComponent } from './pages/gameMode/components/multiplayerOptionBox.component';
import { GameModeComponent } from './pages/gameMode/gameMode.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { BoatSelectorComponent } from './pages/placement/components/boatSelector/boatSelector.component';
import { BoatSelectorImgComponent } from './pages/placement/components/boatSelectorImg/boatSelectorImg.component';
import { GridPlacementComponent } from './pages/placement/components/gridPlacement/gridPlacement.component';
import { PlacementComponent } from './pages/placement/placement.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';



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
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkDrag,
    FormsModule,
  ],
  providers: [
    { provide: API_BASE_URL_TOKEN, useValue: "http://" + window.location.hostname + ":8080" }
  ]
})
export class GameModule { }
