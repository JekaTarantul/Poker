import { Component, OnInit } from '@angular/core';
import {RoomsService} from "./services/rooms.service";
import {Room} from "../models/auth.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: Room[] = [];
  constructor(private roomsService: RoomsService, private router: Router) { }

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe(data => this.rooms = data);
  }

  openRoom(room: Room): void {
    this.navigateToRoom(room.code);
  }

  createRoom(): void {
    this.roomsService.createRoom().subscribe(
      room => {
        this.navigateToRoom(room.code)
      },
      er => console.log(er)
    );
  }

  private navigateToRoom(code: string): void {
    this.router.navigate(['/table'], {queryParams: {code}});
  }
}
