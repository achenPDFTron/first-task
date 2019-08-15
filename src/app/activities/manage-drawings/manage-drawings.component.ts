import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawingService } from 'src/app/services/drawing.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


const defaultInitialDocRelPath = '../assets/lorem-ipsum.pdf';
// const defaultInitialDocRelPath = '../assets/webviewer-demo-annotated.pdf';

@Component({
  selector: 'manage-drawings',
  templateUrl: './manage-drawings.component.html',
  styleUrls: ['./manage-drawings.component.scss']
})
export class ManageDrawingsComponent implements OnDestroy {

  pdfDownloadUrl: string;
  private userName;
  private unsubscribe$: Subject<void>;
  constructor(
              private drawingService: DrawingService,
              private route: ActivatedRoute) {
    this.unsubscribe$ = new Subject();
    this.userName = this.route.snapshot.params.id;
    this.drawingService.downloadDrawingForUser(this.userName)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(
      ( downloadUrl ) => { this.pdfDownloadUrl = downloadUrl },
      // ( downloadUrl ) => { this.pdfDownloadUrl = defaultInitialDocRelPath },
      ( error ) => { this.pdfDownloadUrl = defaultInitialDocRelPath }
    );

  }

  onSavePressed(drawing: Blob) {
    this.drawingService.saveDrawingForUser(this.userName, drawing);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}