import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Subject, switchMap, takeUntil} from "rxjs";
import {RoomsService} from "../rooms/services/rooms.service";
import {TableService} from "./table.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  tableId = null;
  destroyed$ = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private tableService: TableService) {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroyed$),
      switchMap(params => this.tableService.joinTable(params['code']))
    ).subscribe(
      data => console.log(data)
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next(null);
  }
}
