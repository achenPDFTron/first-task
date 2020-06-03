import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ManageComparingDocumentsComponent } from './manage-comparing-documents.component';

@NgModule({
  declarations: [
    ManageComparingDocumentsComponent
  ],
  exports: [
    ManageComparingDocumentsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class ManageComparingDocumentsModule { }