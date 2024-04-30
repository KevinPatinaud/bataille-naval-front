import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RestService {
  constructor(private http: HttpClient) {}

  get(uri: string): Observable<any> {
    return this.http.get(uri);
  }

  post(uri: string, data: any): Observable<any> {
    return this.http.post(uri, data);
  }

  put(uri: string, data: any): Observable<any> {
    return this.http.put(uri, data);
  }
}
