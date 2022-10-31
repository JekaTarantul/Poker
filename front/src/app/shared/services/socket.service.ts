import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }

  private socket = io(environment.SOCKET_URL);

  listen(eventName: string) {
    return new Observable(sub => {
      this.socket.on(eventName, (data) => {
        console.log(data || 'no data')
      })
    })
  }

}
