import {
  MessageBody, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket} from 'socket.io';
import { RoomSocketService } from "../services/room.socket.service";
import { RoomUserEntity } from "../entities/room-user.entity";
import { devFrontOrigin } from "../../constants";
import { EventNames } from "./eventNames";
import { RoomService } from "../services/room.service";

@WebSocketGateway(3100, {cors: {origin: devFrontOrigin}})
export class RoomGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private socketService: RoomSocketService, private roomService: RoomService) {
  }

  afterInit(server: Server): any {
    this.socketService.socket = server;


    this.server.on('connection', (socket) => {
      console.log('connected');

      this.server.on(EventNames.JoinRoom, (data) => {
        console.log('fuck 123', data)
      })
    });

    this.server.on(EventNames.JoinRoom, (data) => {
      console.log('fuck 123', data)
    })


  }

  sayHelloToRoomPlayers(roomPlayers: RoomUserEntity[]) {

  }

  @SubscribeMessage(EventNames.JoinRoom)
  async initConnection(socket: Socket, roomCode: string) {
    socket.join(roomCode);

    const room = await this.roomService.getRoom(roomCode as any);

    console.log('here', room.roomUsers.map(roomUser => roomUser.user.username));
    this.server.to(roomCode).emit(EventNames.RoomPlayersNumberChanged, room);
  }

  handleRoomPlayersNumberChange() {

  }

  handleGameStart() {

  }

  handleRoundStart() {

  }

  handleRoundEnd() {

  }
}