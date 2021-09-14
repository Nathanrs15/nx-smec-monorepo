import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@smec-monorepo/shared/models';
import { UserService } from '@smec-monorepo/users/data-access';

@Component({
  selector: 'smec-monorepo-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  _users!: User[];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);

  get users(): User[] {
    return this._users;
  }
  @Input() set users(value: User[]) {
    this._users = value;
  }

  displayedColumns: string[] = ['userName', 'email', 'roles', 'actions'];

  hasPermission = this.userService.checkPermissions;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dataSource.data = this.users;
  }
}
