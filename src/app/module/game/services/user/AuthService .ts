import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiLoginUrl = "http://localhost:8080/api/login";
  private apiSignupUrl = "http://localhost:8080/api/signup";

  constructor(private http: HttpClient) {}
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.apiSignupUrl, {
      username,
      email,
      password,
    });
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiLoginUrl, { username, password });
  }
}
