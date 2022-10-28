import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { JoinTable } from 'typeorm';
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
}
