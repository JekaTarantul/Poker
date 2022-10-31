import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable, of, Subject, switchMap, takeUntil, tap} from "rxjs";
import {RoomsService} from "../rooms/services/rooms.service";
import {TableService} from "./services/table.service";
import {Room, RoomUser} from "../models/auth.models";
import {AuthService} from "../auth/services/auth.service";
import {TableSizes, TableUserPlacement, TableUserPlacements} from "./models/table.models";
import {Socket} from "ngx-socket-io";
import {SocketService} from "../shared/services/socket.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  tableId: any = null;

  destroyed$ = new Subject();

  tableData: Room;

  tableSizes: TableSizes = {
    width: 900,
    height: 600
  }

  userPlacements: Map<number, TableUserPlacement>;

  constructor(private activatedRoute: ActivatedRoute,
              private tableService: TableService,
              private roomsService: RoomsService,
              private authService: AuthService,
              private socketService: SocketService
              ) {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroyed$),
      switchMap(params => this.roomsService.getRoom(params['code'])),
      switchMap(room => this.handleIfRoomJoinRequired(room))
    ).subscribe(
      data => {
        this.tableData = data;
        this.setUsersPlacement(this.tableData.roomUsers);

        this.socketService.listen('temp').subscribe(
          data => console.log('ass')
        )
      }
    )
  }

  private connectToSocket(code: string): void {

  }

  private setUsersPlacement(roomUsers: RoomUser[]): void {
    const map: TableUserPlacements = new Map<number, TableUserPlacement>();
    const padding = 80;
    // всегда садим вниз поцентру, потом надо будет написать метод, который обновляет массив юезров таким образом
    // чтоб игрок всегда был нулевым в масиве. либо же на беке это сделать


    const leftCenter = {x: padding, y: this.tableSizes.height / 2};
    const topCenter = {x: this.tableSizes.width / 2, y: padding};
    const leftTop = {x: 0 + padding, y: padding};
    const rightTop = {x: this.tableSizes.width - padding, y: padding};
    const rightCenter = {x: this.tableSizes.width - padding, y: this.tableSizes.height / 2}
    const topQuartLeft = {x: this.tableSizes.width / 4, y: padding};
    const topQuartRight = {x: this.tableSizes.width / 4 * 3, y: padding}
    const bottomRight = {x: this.tableSizes.width - padding, y: this.tableSizes.height - padding};
    const leftBottom =  {x: 0 + padding, y: this.tableSizes.height - padding};
    const bottomCenter = {x: this.tableSizes.width / 2, y: this.tableSizes.height - padding};

    const currentUserPlacement = map.set(roomUsers[0].id, bottomCenter);

    if (roomUsers.length === 2) {
      map.set(roomUsers[1].id, topCenter)
    }

    if (roomUsers.length === 3) {
      map.set(roomUsers[1].id, leftTop);
      map.set(roomUsers[2].id, rightTop)
    }

    if (roomUsers.length === 4) {
      map.set(roomUsers[1].id, leftCenter);
      map.set(roomUsers[2].id, topCenter);
      map.set(roomUsers[3].id, rightCenter)
    }

    if (roomUsers.length === 5) {
      map.set(roomUsers[1].id, leftCenter);
      map.set(roomUsers[2].id, topQuartLeft);
      map.set(roomUsers[3].id, topQuartRight);
      map.set(roomUsers[4].id, rightCenter)
    }

    if (roomUsers.length === 6) {
      map.set(roomUsers[1].id, leftCenter);
      map.set(roomUsers[2].id, topQuartLeft);
      map.set(roomUsers[3].id, topCenter);
      map.set(roomUsers[4].id, topQuartRight);
      map.set(roomUsers[5].id, rightCenter)
    }

    if (roomUsers.length === 7) {
      map.set(roomUsers[1].id, leftCenter);
      map.set(roomUsers[2].id, topQuartLeft);
      map.set(roomUsers[3].id, topCenter);
      map.set(roomUsers[4].id, topQuartRight);
      map.set(roomUsers[5].id, rightCenter);
      map.set(roomUsers[6].id, bottomRight);
    }

    if (roomUsers.length === 8) {
      map.set(roomUsers[1].id, leftBottom);
      map.set(roomUsers[2].id, leftCenter);
      map.set(roomUsers[3].id, topQuartLeft);
      map.set(roomUsers[4].id, topCenter);
      map.set(roomUsers[5].id, topQuartRight);
      map.set(roomUsers[6].id, rightCenter);
      map.set(roomUsers[7].id, bottomRight);
    }

    this.userPlacements = map;

    console.log(this.userPlacements)
  }

  private mockUsersData(numberOfUsers: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): RoomUser[]{
    const currentUser = this.authService.currentUser;

    const defaultUser = {
      balance: 100,
      id: 1,
      room: {code: this.tableData.code, id: this.tableData.id},
      user: currentUser
    };

    const result = [defaultUser];

    if (numberOfUsers === 1) {
      return result;
    }

    if (numberOfUsers > 1) {
      let startId = numberOfUsers;

      for (let i = 1; i < numberOfUsers; i++) {
        const mockUser = {
          balance: 100,
          id: startId,
          room: {code: this.tableData.code, id: this.tableData.id},
          user: {
            username: 'mock_' + startId,
            id: startId,
            room: {code: this.tableData.code, id: this.tableData.id}
          }
        }

        // @ts-ignore
        result.push(mockUser)

        startId++
      }
    }

    return result;
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
