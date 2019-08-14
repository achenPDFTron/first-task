import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';

declare const WebViewer: any;

@Component({
  selector: 'draw-panel',
  templateUrl: './draw-panel.component.html',
  styleUrls: ['./draw-panel.component.scss']
})
export class DrawPanelComponent implements OnInit, AfterViewInit {

  private lastUpdatedDateAnnotation: any;

  @ViewChild('viewer', {static: false}) viewer: ElementRef;
  wvInstance: any;

  ngOnInit(): void {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  ngAfterViewInit(): void {
    WebViewer({
      // TODO make this path an input
      path: '../assets/webviewer/',
      // TODO make initial doc an input
      initialDoc: '../assets/lorem-ipsum.pdf'
    }, this.viewer.nativeElement).then(instance => {
      // Disable all tools
      instance.disableTools();
      // Only enable free hand draw tool according to specs
      instance.enableTools(['AnnotationCreateFreeHand']);
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      instance.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      const annotManager = instance.annotManager;
      annotManager.on('annotationChanged', () => {
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
        this.lastUpdatedDateAnnotation.setWidth(300);
        this.lastUpdatedDateAnnotation.setHeight(300);
        this.lastUpdatedDateAnnotation.setContents(`Last updated: ${new Date()}`);
        this.lastUpdatedDateAnnotation.FillColor = new Annotations.Color(0, 255, 255);
        this.lastUpdatedDateAnnotation.FontSize = '12pt';

        annotManager.addAnnotation(this.lastUpdatedDateAnnotation);
        annotManager.redrawAnnotation(this.lastUpdatedDateAnnotation);
      });
    })
  }

  onSave() {
    // const docViewer = this.wvInstance.docViewer;
    // const doc = docViewer.getDocument();

    // doc.getFileData().then(function(data) {
    //   var arr = new Uint8Array(data);
    //   var blob = new Blob([arr], { type: 'application/pdf' });
    //   var url= window.URL.createObjectURL(blob);
    //   window.open(url);
    // });
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    // const { Annotations } = this.wvInstance;
    // const rectangle = new Annotations.RectangleAnnotation();
    // rectangle.PageNumber = 1;
    // rectangle.X = 100;
    // rectangle.Y = 100;
    // rectangle.Width = 250;
    // rectangle.Height = 250;
    // rectangle.StrokeThickness = 5;
    // rectangle.Author = annotManager.getCurrentUser();
    // annotManager.addAnnotation(rectangle);
    // annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }

}