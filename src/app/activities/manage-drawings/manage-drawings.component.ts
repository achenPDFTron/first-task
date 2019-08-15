import { Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { DrawingService } from 'src/app/services/drawing.service';

@Component({
  selector: 'manage-drawings',
  templateUrl: './manage-drawings.component.html',
  styleUrls: ['./manage-drawings.component.scss']
})
export class ManageDrawingsComponent {
  constructor(private router: Router,
              private drawingService: DrawingService,
              private route: ActivatedRoute) {

  }

  onSavePressed(drawing: Blob) {
    // console.log(this.route.snapshot.params.id);
    // console.log(blob);
    const userName = this.route.snapshot.params.id;
    this.drawingService.saveDrawing(userName, drawing);
  }
}