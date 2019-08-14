import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'mock-login-page',
  templateUrl: './mock-login-page.component.html',
  styleUrls: ['./mock-login-page.component.scss']
})
export class MockLoginPageComponent {
  mockUserNames = ['a', 'b', 'c'];

  @Output()
  userNameClicked = new EventEmitter<string>();

  constructor(private router: Router) {

  }

  onUserNameClicked(mockUserName) {
    this.userNameClicked.emit(mockUserName);
    // this.router.navigate(['/user', mockUserName]);
  }
}