import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RestService } from "./services/rest/rest.service";
import { ModalComponent } from "./components/modal/modal.component";

@NgModule({
  imports: [HttpClientModule],
  providers: [RestService],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class CoreModule {}
