import { NgModule } from '@angular/core';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';

@NgModule({
  declarations: [
    ManageUsersComponent,
    MockLoginPageComponent
  ],
  exports: [
    ManageUsersComponent,
    MockLoginPageComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ManageUsersModule { }