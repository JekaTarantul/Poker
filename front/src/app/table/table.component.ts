import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {RoomsService} from "../rooms/services/rooms.service";
import {TableService} from "./table.service";
import {Room} from "../models/auth.models";
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  tableId: any = null;

  destroyed$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute,
              private tableService: TableService,
              private roomsService: RoomsService,
              private authService: AuthService) {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroyed$),
      switchMap(params => this.roomsService.getRoom(params['code'])),
      switchMap(room => this.handleIfRoomJoinRequired(room))
    ).subscribe(
      data => console.log('room:', data)
    )
  }

  handleIfRoomJoinRequired(room: Room): Observable<Room> {
    console.log('currentUser', this.authService.currentUser)
    if (room.roomUsers.some(roomUser => roomUser.user.username === this.authService.currentUser.username)) {
      return of(room)
    } else {
      return this.tableService.joinTable(room.code);
    }
  }

  private isUserInRoom(room: Room) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroyed$.next(null);
  }
}
