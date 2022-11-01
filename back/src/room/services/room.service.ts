import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import * as crypto from 'crypto';
import { RoomUserEntity } from '../entities/room-user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RoomUserEntity) private RURepository: Repository<RoomUserEntity>,
  ) {}

  async createRoom({ username }: User) {
    const code = await this.generateCode();
    const defaultRoomBalance = 100;
    const user = await this.userRepository.findOneBy({ username });
    const room = await this.roomRepository.create({
      code,
      roomUsers: [{ user: user, balance: defaultRoomBalance }],
      roomCreatorName: username,
    });

    await this.roomRepository.save(room);
    return room;
  }

  async getRooms(count = 50) {
    const rooms = await this.roomRepository.find({ take: count });

    return rooms;
  }

  async getRoom(code: number) {
    const room = await this.roomRepository.findOne({
      where: { code },
      relations: ['roomUsers', 'roomUsers.user', 'roomUsers.room'],
    });
    return room;
  }

  async joinRoom(code: number, userToJoin: User): Promise<Room> {
    const defaultRoomBalance = 100;
    const room = await this.getRoom(code);

    if (!room) {
      throw new NotFoundException(`This room doesn't exist`);
    }

    const user = await this.userRepository.findOneBy({ username: userToJoin.username });

    const isUserInRoom = !!room.roomUsers.find((roomUser) => roomUser.user.username === userToJoin.username)

    if (isUserInRoom) {
      throw new BadRequestException('User already in the room');
    }

    const roomUser = this.RURepository.create({
      user,
      room,
      balance: defaultRoomBalance,
    });

    room.roomUsers.push(roomUser);

    await this.roomRepository.save(room);

    return this.getRoom(code);
  }

  async leaveRoom(code: number, user: User) {
    const room: Room = await this.roomRepository.findOne({ where: { code } });

    if (!room) {
      throw new NotFoundException(`This room doesn't exist`);
    }

    room.roomUsers = room.roomUsers.filter((_user) => _user.id !== user.id);

    return this.roomRepository.update({ id: room.id }, room);
  }

  private async generateCode() {
    let code;
    do {
      code = crypto.randomBytes(3).toString('hex');
    } while ((await this.roomRepository.count({ where: { code } })) !== 0);
    return code.toUpperCase();
  }
}
