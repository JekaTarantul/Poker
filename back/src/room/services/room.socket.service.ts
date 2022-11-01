import { Injectable } from '@nestjs/common';
import { Server } from "socket.io";

@Injectable()
export class RoomSocketService {
  constructor() {

  }

  socket: Server;
}
