import { Component, EventEmitter, Input, Output } from "@angular/core";

import { CdkDrag, CdkDragStart, Point } from "@angular/cdk/drag-drop";
import { BoatDescription } from "src/app/module/game/models/boatDescription";

@Component({
  selector: "app-boat-selector-img",
  templateUrl: "./boatSelectorImg.component.html",
  styleUrls: ["./boatSelectorImg.component.css"],
})
export class BoatSelectorImgComponent {
  @Output() onBoatSelectedEvent = new EventEmitter<BoatDescription>();
  @Input() boatToDisplay?: BoatDescription;
  @Input() selected?: boolean;
  @Input() disable?: boolean;
  @Input() isMouseOverTheGrid?: boolean;

  freeDragPosition: Point = { x: 0, y: 0 };
  private initialPosition: Point = { x: 0, y: 0 };

  onBoatSelected(boat: BoatDescription) {
    this.onBoatSelectedEvent.emit(boat);
  }

  dragStarted(event: CdkDragStart, dragRef: CdkDrag) {
    dragRef.getRootElement().style.position = "relative";
    dragRef.getRootElement().style.zIndex = "99999";
    this.initialPosition = {
      x: this.freeDragPosition.x,
      y: this.freeDragPosition.y,
    };
  }

  dragEnded(dragRef: CdkDrag) {
    dragRef.getRootElement().style.zIndex = "";
    this.freeDragPosition = {
      x: this.initialPosition.x,
      y: this.initialPosition.y,
    };
  }
}
