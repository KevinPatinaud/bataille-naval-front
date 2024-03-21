import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestService {
  serverUrl = "http://" + window.location.hostname + ":8080/bataille-navale/";

  constructor(private http: HttpClient) {}

  get(uri: string): Observable<any> {
    return this.http.get(this.serverUrl + uri);
  }
  getText(uri: string): Observable<any> {
    return this.http.get(this.serverUrl + uri, { responseType: "text" });
  }

  // Exemple d'une méthode POST
  post(uri: string, data: any): Observable<any> {
    return this.http.post(this.serverUrl + uri, data);
  }
}
