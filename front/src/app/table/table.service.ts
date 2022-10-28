import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {

  }

  joinTable(code: string): Observable<unknown> {
    console.warn(code)
    return this.http.post(environment.API_URL + 'room/join/' + code, {})
  }
}
