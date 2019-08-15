import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawingService } from 'src/app/services/drawing.service';

@Component({
  selector: 'manage-drawings',
  templateUrl: './manage-drawings.component.html',
  styleUrls: ['./manage-drawings.component.scss']
})
export class ManageDrawingsComponent {
  private userName;
  constructor(
              private drawingService: DrawingService,
              private route: ActivatedRoute) {
    this.userName = this.route.snapshot.params.id;
    this.drawingService.downloadDrawingForUser(this.userName)
    .subscribe(
      a => console.log(a),
      b => console.log('error', b)
    );

  }

  onSavePressed(drawing: Blob) {
    this.drawingService.saveDrawingForUser(this.userName, drawing);
  }
}