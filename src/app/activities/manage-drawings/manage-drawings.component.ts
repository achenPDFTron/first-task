import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'manage-drawings',
  templateUrl: './manage-drawings.component.html',
  styleUrls: ['./manage-drawings.component.scss']
})
export class ManageDrawingsComponent {
  constructor(private router: Router) {

  }
}