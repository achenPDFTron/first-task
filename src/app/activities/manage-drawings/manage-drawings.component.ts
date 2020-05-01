import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawingService } from 'src/app/services/drawing.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


const defaultInitialDocRelPath = '../assets/form-1040.pdf';
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
              private route: ActivatedRoute,
              private router: Router) {
    this.unsubscribe$ = new Subject();
    this.userName = this.route.snapshot.params.id;
    this.drawingService.downloadDrawingForUser(this.userName)
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(
      ( downloadUrl ) => { 
        // this.pdfDownloadUrl = downloadUrl 
        this.pdfDownloadUrl = defaultInitialDocRelPath; 
      },
      // ( downloadUrl ) => { this.pdfDownloadUrl = defaultInitialDocRelPath },
      ( error ) => { this.pdfDownloadUrl = defaultInitialDocRelPath }
    );

  }

  onSavePressed(drawing: Blob) {
    this.drawingService.saveDrawingForUser(this.userName, drawing);
  }

  onGoHomePressed() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}