import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RoomUser} from "../../../models/auth.models";

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit, OnChanges {
  private defaultProfilePic = 'assets/default_profile_pic.jfif';
  profilePic: string = this.defaultProfilePic;
  @Input() roomUser: RoomUser;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.roomUser.currentValue) {
      // @ts-ignore
      this.profilePic = changes.roomUser.currentValue.user.profilePicture || this.defaultProfilePic;

      console.log(this.profilePic)
    }
  }

}
