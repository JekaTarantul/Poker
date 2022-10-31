import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Room} from "../../models/auth.models";
import {io} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) {

  }

  joinTable(code: string): Observable<Room> {
    console.warn(code)
    return this.http.post(environment.API_URL + 'room/join/' + code, {}) as Observable<Room>
  }

  joinTableSocket(code: string) {
    // this.socket.emit('joinSocketRoom')
  }


}
