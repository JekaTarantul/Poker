import { Injectable } from '@angular/core';
import {io} from "socket.io-client";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketEvents} from "../enums/socketEvents/events";
import {Room, RoomUser} from "../../models/auth.models";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  roomData$: BehaviorSubject<Room> = new BehaviorSubject<any>(null);

  constructor() {
    this.listenTempEvent();
  }

  private socket = io(environment.SOCKET_URL, {rejectUnauthorized: false});

  private listenTempEvent() {
    this.socket.on(SocketEvents.RoomPlayersNumberChanged, data => {
      this.roomData$.next(data);
    });
  }

  joinRoomSocket(code: string) {
    this.socket.emit(SocketEvents.JoinRoom, code);
  }
}
