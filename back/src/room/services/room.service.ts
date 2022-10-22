import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import * as crypto from 'crypto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createRoom({ id }: User) {
    const code = await this.generateCode();
    const user = await this.userRepository.findOneBy({ id });
    const room = await this.roomRepository.create({
      code,
      users: [user],
    });
    await this.roomRepository.save(room);
    return room.code;
  }

  async getRoom(code: number) {
    const room = await this.roomRepository.findOne({
      where: { code },
      relations: ['users'],
    });
    return room;
  }

  async joinRoom(code: number, { id }: User) {
    const room = await this.roomRepository.findOne({ where: { code } });
    if (!room) {
      throw new NotFoundException(`This room doesn't exist`);
    }
    const user = await this.userRepository.findOneBy({ id });
    room.users.push(user);
    await this.roomRepository.update({ id: room.id }, room);
  }

  async leaveRoom(code: number, user: User) {
    const room = await this.roomRepository.findOne({ where: { code } });
    if (!room) {
      throw new NotFoundException(`This room doesn't exist`);
    }
    room.users = room.users.filter((_user) => _user.id !== user.id);
    if (!room.users.length) {
      return this.roomRepository.delete(room);
    }
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
