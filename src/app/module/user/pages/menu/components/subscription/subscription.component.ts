import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/module/user/services/auth/AuthService ";

@Component({
  selector: "user-subscription",
  templateUrl: "./subscription.component.html",
})
export class SubscriptionComponent {
  @Output() userSubscribedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  subscribe(form: NgForm) {
    console.log(form.value); 
    this.authService.subscribe(form.value.username, form.value.mail, form.value.password).subscribe(    );
  }
}
