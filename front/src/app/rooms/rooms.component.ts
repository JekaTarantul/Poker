import { Component, OnInit } from '@angular/core';
import {RoomsService} from "./services/rooms.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: { id: number, code: string }[] = [];
  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.roomsService.getRooms().subscribe(data => this.rooms = data);
  }

}
