import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import WebViewer, { WebViewerInstance } from '@pdftron/webviewer';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('viewer', { static: false }) 
  private viewer: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();

  public async ngAfterViewInit() {
    const instance: WebViewerInstance = await WebViewer(
      {
        // ui: 'beta',
        path: '../assets/webviewer/',
        // initialDoc: './assets/demo/webviewer-demo-annotated.pdf',
        // ...environment.viewer.options,
      },
      this.viewer.nativeElement
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
