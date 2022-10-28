import {
  Column,
  Entity, JoinColumn, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from '../../auth/entities/user.entity';
import { JoinTable } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class RoomUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.id)
  @JoinColumn()
  room: Room;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  balance: number;
}
