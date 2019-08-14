import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';
import { ManagerUsersComponent } from './activities/manage-users/manage-users.component';


const routes: Routes = [
  { path: 'users', component: ManagerUsersComponent },
  { path: 'user/:id', component: ManageDrawingComponent },
  { path: '',   redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
