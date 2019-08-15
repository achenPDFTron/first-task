import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

declare const WebViewer: any;

// https://www.pdftron.com/documentation/web/guides/wv-inside/#loading-webviewer-from-another-domain
// https://www.pdftron.com/api/web/WebViewer.html ; iFrameWindow object
@Component({
  selector: 'draw-panel',
  templateUrl: './draw-panel.component.html',
  styleUrls: ['./draw-panel.component.scss']
})
export class DrawPanelComponent implements OnChanges, OnInit, AfterViewInit {

  @Input()
  initialDocPath: string;

  @Output()
  savePressed = new EventEmitter<Blob>();

  @ViewChild('viewer', {static: false}) viewer: ElementRef;
  wvInstance: any;

  private lastUpdatedDateAnnotation: any;

  private isNotFirst = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialDocPath'] && this.initialDocPath) {
      if (this.viewer) {
        this.setUpWebViewer();
      }
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // this.setUpWebViewer();
  }

  async onSave() {
    // https://www.pdftron.com/documentation/web/guides/features/basics/save?searchTerm=save
    // https://www.pdftron.com/documentation/web/guides/features/basics/save?searchTerm=save#a-document
    const docViewer = this.wvInstance.docViewer;

    const annotManager = this.wvInstance.annotManager;

    const doc = docViewer.getDocument();
    // https://www.pdftron.com/documentation/web/guides/get-file-data-with-viewer/
    const data = await doc.getFileData({
      // need this so that we can save annotations as well
      xfdfString: annotManager.exportAnnotations()
    });
    const arr = new Uint8Array(data);
    const blob = new Blob([arr], { type: 'application/pdf' });
    this.savePressed.emit(blob);
  }

  private setUpWebViewer() {
    WebViewer({
      // TODO make this path an input
      path: '../assets/webviewer/',
      initialDoc: this.initialDocPath
    }, this.viewer.nativeElement).then(instance => {
      // Disable all tools
      instance.disableTools();
      instance.disableNotesPanel();
      // Only enable free hand draw tool according to specs
      instance.enableTools(['AnnotationCreateFreeHand']);
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      instance.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      const annotManager = instance.annotManager;
      const docViewer = instance.docViewer;

      docViewer.on('documentLoaded', () => {
        if (this.lastUpdatedDateAnnotation) {
          annotManager.deleteAnnotation(this.lastUpdatedDateAnnotation);
          this.lastUpdatedDateAnnotation = undefined;
        }

        const Annotations = instance.Annotations;
        // https://www.pdftron.com/api/web/Annotations.html
        this.lastUpdatedDateAnnotation = new Annotations.FreeTextAnnotation();
        this.lastUpdatedDateAnnotation.PageNumber = 1;
        this.lastUpdatedDateAnnotation.X = 0;
        this.lastUpdatedDateAnnotation.Y = 0;
        this.lastUpdatedDateAnnotation.setWidth(450);
        this.lastUpdatedDateAnnotation.setHeight(25);
        this.lastUpdatedDateAnnotation.setPadding(new Annotations.Rect(0, 0, 0, 0));
        this.lastUpdatedDateAnnotation.setContents(`Last updated: N/A`);
        this.lastUpdatedDateAnnotation.FillColor = new Annotations.Color(0, 255, 255);
        this.lastUpdatedDateAnnotation.FontSize = '12pt';
        this.lastUpdatedDateAnnotation.ReadOnly = true;

        annotManager.addAnnotation(this.lastUpdatedDateAnnotation);
        // annotManager.redrawAnnotation(this.lastUpdatedDateAnnotation);
      });
      annotManager.on('annotationChanged', (e) => {
        if (this.lastUpdatedDateAnnotation && this.isNotFirst) {
          this.lastUpdatedDateAnnotation.setContents(`Last updated: ${new Date()}`);
        }
        this.isNotFirst = true;
      });
    })
  }

}