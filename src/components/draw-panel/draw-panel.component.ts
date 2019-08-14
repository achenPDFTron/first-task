import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';

declare const WebViewer: any;

@Component({
  selector: 'draw-panel',
  templateUrl: './draw-panel.component.html',
  styleUrls: ['./draw-panel.component.scss']
})
export class DrawPanelComponent implements OnInit, AfterViewInit {

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
      initialDoc: '../assets/webviewer-demo-annotated.pdf'
    }, this.viewer.nativeElement).then(instance => {
      // Disable all tools
      instance.disableTools();
      // Only enable free hand draw tool according to specs
      instance.enableTools(['AnnotationCreateFreeHand']);
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      instance.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis for the full list of APIs

      // or listen to events from the viewer element
      // this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
      //   const [ pageNumber ] = e.detail;
      // });

      // or from the docViewer instance
      // instance.docViewer.on('annotationsLoaded', () => {

      // });

      // instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler)
      const annotManager = instance.annotManager;
      annotManager.on('annotationChanged', function() {
        console.log('annotation changed');
      });
    })
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewer.html for the full list of low-level APIs
  }

}