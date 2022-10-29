import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RoomUserEntity } from "./room-user.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: number;

  @OneToMany(() => RoomUserEntity, (roomUser) => roomUser.room, {cascade: true})
  @JoinColumn()
  roomUsers: RoomUserEntity[];

  @Column()
  roomCreatorName: string
}
