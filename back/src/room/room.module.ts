import { Module } from '@nestjs/common';
import { RoomController } from './controllers/room.controller';
import { RoomService } from './services/room.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from '../auth/entities/user.entity';
import { RoomUserEntity } from './entities/room-user.entity';
import { RoomSocketService } from './services/room.socket.service';
import { RoomGateway } from "./socket/room.socket";

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, RoomUserEntity])],
  controllers: [RoomController],
  providers: [RoomService, RoomSocketService, RoomGateway],
})
export class RoomModule {}
