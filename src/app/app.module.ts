import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { CommonModule } from '@angular/common';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';
import { ManageUsersModule } from './activities/manage-users/manage-users.module';
import { ManageDrawingModule } from './activities/mange-drawings/mange-drawings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ManageUsersModule,
    ManageDrawingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
