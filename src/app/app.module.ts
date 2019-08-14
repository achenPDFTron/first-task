import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ManageDrawingModule } from './activities/manage-drawings/manage-drawings.module';
import { ManageUsersModule } from './activities/manage-users/manage-users.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // AppRoutingModule,
    ManageUsersModule,
    ManageDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
