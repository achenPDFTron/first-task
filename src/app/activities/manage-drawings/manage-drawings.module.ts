import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawPanelComponent } from 'src/components/draw-panel/draw-panel.component';
import { ManageDrawingsComponent } from './manage-drawings.component';
import { BrowserModule } from '@angular/platform-browser';

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
    BrowserModule
  ]
})
export class ManageDrawingModule { }