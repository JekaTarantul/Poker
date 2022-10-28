import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Room } from '../../room/entities/room.entity';
import { RoomUserEntity } from "../../room/entities/room-user.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  balance: number;

  @OneToMany(() => RoomUserEntity, (room) => room.id)
  @JoinColumn()
  rooms: RoomUserEntity[];

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;
}
