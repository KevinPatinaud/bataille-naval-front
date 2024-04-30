import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/module/user/services/auth/AuthService ";

@Component({
  selector: "user-connexion",
  templateUrl: "./connexion.component.html",
})
export class ConnexionComponent {
  @Output() userConnectedEvent: EventEmitter<any> = new EventEmitter();

  constructor(private authService: AuthService) {}

  connect(form: NgForm) {
    console.log(form.value); 
    this.authService.login(form.value.username, form.value.mail, form.value.password).subscribe(
      (response) => {
        alert("Welcome !");
        this.userConnectedEvent.emit();
      },
      (error) => {
        console.log(error);
        alert("Error !");
      },
    );
  }
}
