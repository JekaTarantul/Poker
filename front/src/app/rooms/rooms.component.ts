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

  joinRoom(room: Room): void {
    this.router.navigate(['/table'], {queryParams: {code: room.code}});
  }
}
