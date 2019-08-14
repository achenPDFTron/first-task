import { NgModule } from '@angular/core';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { CommonModule } from '@angular/common';
import { ManagerDrawingsComponent } from './mange-drawings.component';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';

@NgModule({
  declarations: [
    ManagerDrawingsComponent,
    DrawPanelComponent
  ],
  exports: [
    ManagerDrawingsComponent,
    DrawPanelComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ManageDrawingModule { }