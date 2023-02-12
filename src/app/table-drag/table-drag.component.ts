import { Component, OnInit } from "@angular/core";
import { TableDragService } from "./table-drag.service";
import { User } from "./user";
import { Subscription } from "rxjs";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-table-drag",
  templateUrl: "./table-drag.component.html",
  styleUrls: ["./table-drag.component.scss"],
  providers: [TableDragService]
})
export class TableDragComponent implements OnInit {
  busyGetUser: Subscription;
  users: User[];

  constructor(private _userApi: TableDragService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.busyGetUser = this._userApi.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.users, event.previousIndex, event.currentIndex);
    this.users.forEach((user, idx) => {
      user.order = idx + 1;
    });
  }
}
