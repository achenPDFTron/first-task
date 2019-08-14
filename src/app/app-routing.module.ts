import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';
import { ManageUsersComponent } from './activities/manage-users/manage-users.component';
import { ManageDrawingsComponent } from './activities/manage-drawings/manage-drawings.component';


const routes: Routes = [
  { path: 'users', component: ManageUsersComponent },
  { path: 'user/:id', component: ManageDrawingsComponent },
  { path: '',   redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
