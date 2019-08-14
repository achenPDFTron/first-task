import { NgModule } from '@angular/core';
import { MockLoginPageComponent } from 'src/components/mock-login-page/mock-login-page.component';
import { CommonModule } from '@angular/common';
import { ManageDrawingsComponent } from './manage-drawings.component';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';

@NgModule({
  declarations: [
    ManageDrawingsComponent,
    DrawPanelComponent
  ],
  exports: [
    ManageDrawingsComponent,
    DrawPanelComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class ManageDrawingModule { }