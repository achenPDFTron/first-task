import { NgModule } from '@angular/core';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { CommonModule } from '@angular/common';
import { ManagerUsersComponent } from './manage-users.component';

@NgModule({
  declarations: [
    ManagerUsersComponent,
    MockLoginPageComponent
  ],
  exports: [
    ManagerUsersComponent,
    MockLoginPageComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ManageUsersModule { }