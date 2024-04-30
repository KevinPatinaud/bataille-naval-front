import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL_TOKEN } from "src/app/app.module";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiLoginUrl = "/api/login";
  private apiSignupUrl = "/api/signup";

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL_TOKEN) public apiBaseURL: string,
  ) {}

  subscribe(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.apiBaseURL + this.apiSignupUrl, {
      username,
      email,
      password,
    });
  }

  login(username: string, email : string , password: string): Observable<any> {
    return this.http.post(this.apiBaseURL + this.apiLoginUrl, {
      username,
      email,
      password,
    });
  }
}
