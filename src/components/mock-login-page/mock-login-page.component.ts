import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mock-login-page',
  templateUrl: './mock-login-page.component.html',
  styleUrls: ['./mock-login-page.component.scss']
})
export class MockLoginPageComponent {
  mockUserNames = ['a', 'b', 'c'];

  @Output()
  userNameClicked = new EventEmitter<string>();

  constructor() {

  }

  onUserNameClicked(mockUserName) {
    this.userNameClicked.emit(mockUserName);
  }
}