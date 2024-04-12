import { Component } from "@angular/core";
import { AuthService } from "src/app/services/user/AuthService ";

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.css"],
})
export class InscriptionComponent {
  username: string = "kevin";
  email: string = "kevin@patinaud.org";
  password: string = "Password";

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService
      .register(this.username, this.email, this.password)
      .subscribe(
        (data: any) => {
          console.log("Inscription réussie", data);
          // Redirigez l'utilisateur ou affichez un message de succès
        },
        (error: any) => {
          console.error("Erreur d'inscription", error);
        }
      );
  }
}
