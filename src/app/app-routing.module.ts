import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDrawingsComponent } from './activities/manage-drawings/manage-drawings.component';
import { ManageUsersComponent } from './activities/manage-users/manage-users.component';


const routes: Routes = [
  { path: 'users', component: ManageUsersComponent },
  { path: 'users/:id', component: ManageDrawingsComponent },
  { path: '',   redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
