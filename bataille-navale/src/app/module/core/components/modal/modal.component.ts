import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "core-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent {
  @Output() closeModalEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  closeModal() {
    this.closeModalEvent.emit();
  }
}
