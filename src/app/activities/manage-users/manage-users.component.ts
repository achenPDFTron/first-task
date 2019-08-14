import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  constructor(private router: Router) {

  }

  onUserNameClicked(mockUserName) {
    this.router.navigate(['/user', mockUserName]);
  }
}