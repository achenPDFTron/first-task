import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import WebViewer, { WebViewerInstance, PDFNet, Annotations } from '@pdftron/webviewer';


// most of the code was taken from https://www.pdftron.com/samples/web/samples/full-apis/ViewerPDFDiffTest/ViewerPDFDiffTest.js

@Component({
  selector: 'manage-comparing-documents',
  templateUrl: './manage-comparing-documents.component.html',
  styleUrls: ['./manage-comparing-documents.component.scss']
})
export class ManageComparingDocumentsComponent implements AfterViewInit {
  @ViewChild('middle', {static: false}) 
  private middle: ElementRef;

  @ViewChild('left', {static: false}) 
  private left: ElementRef;

  @ViewChild('right', {static: false}) 
  private right: ElementRef;

  private midPanelInstance: WebViewerInstance;
  private rightPanelInstance: WebViewerInstance;
  private leftPanelInstance: WebViewerInstance;
  private uploadedDoc: PDFNet.PDFDoc[];

  private originalScroller: Element;
  private scrollTimeout: NodeJS.Timer;

  private documentContainers: Element[];

  constructor() {
    this.uploadedDoc = [];
    this.documentContainers = [];
  }
  ngAfterViewInit(): void {
    this.setUpWebViewer(this.middle.nativeElement).then((instance) => {
      this.midPanelInstance = instance;
      const documentContainer = this.middle.nativeElement.querySelector('iframe').contentDocument.querySelector('.DocumentContainer');
      this.documentContainers[1] = documentContainer;
    });
    this.setUpWebViewer(this.right.nativeElement).then((instance) => {
      this.rightPanelInstance = instance;
      const documentContainer = this.right.nativeElement.querySelector('iframe').contentDocument.querySelector('.DocumentContainer');
      this.documentContainers[2] = documentContainer;
    });
    this.setUpWebViewer(this.left.nativeElement).then((instance) => {
      this.leftPanelInstance = instance;
      const documentContainer = this.left.nativeElement.querySelector('iframe').contentDocument.querySelector('.DocumentContainer');
      this.documentContainers[0] = documentContainer;      
    });
  }

  compareDoc = async(doc1: PDFNet.PDFDoc, doc2: PDFNet.PDFDoc) => {
    const newDoc = await this.midPanelInstance.PDFNet.PDFDoc.create();
    newDoc.lock();

    const options = await this.getDiffOptions();

    const pages = [];
    const itr = await doc1.getPageIterator(1);
    const itr2 = await doc2.getPageIterator(1);

    let i = 0;
    for (itr; await itr.hasNext(); itr.next()) {
      const page = await itr.current();
      pages[i] = [page];
      i++;
    }

    i = 0;
    for (itr2; await itr2.hasNext(); itr2.next()) {
      const page = await itr2.current();
      (pages[i] || (pages[i] = [null])).push(page);
      i++;
    }

    pages.forEach(async([p1, p2]) => {
      if (!p1) {
        p1 = new this.midPanelInstance.PDFNet.Page();
      }
      if (!p2) {
        p2 = new this.midPanelInstance.PDFNet.Page();
      }

      await newDoc.appendVisualDiff(p1, p2, options);
    });

    await newDoc.unlock();
    this.midPanelInstance.loadDocument(newDoc as any);
  };

  getDiffOptions = async() => {
    const redColor = new this.midPanelInstance.Annotations.Color(200, 0, 0, 1);
    const blueColor = new this.midPanelInstance.Annotations.Color(0, 200, 200, 1);

    const options = await this.midPanelInstance.PDFNet.createDiffOptions();

    options.setColorA(redColor as any);
    options.setColorB(blueColor as any);

    options.setBlendMode(5);
    return options;
  };

  getPDFDocFromUpload = async(file: File, fileIndex: number) => {
    const newDoc = await this.midPanelInstance.CoreControls.createDocument(file, {});
    this.uploadedDoc[fileIndex] = await newDoc.getPDFDoc();
    if (fileIndex === 0) {
      this.leftPanelInstance.loadDocument(file);
    } else if (fileIndex === 1) {
      this.rightPanelInstance.loadDocument(file);
    }
    if (this.uploadedDoc[1] && this.uploadedDoc[0]) {
      this.compareDoc(this.uploadedDoc[0], this.uploadedDoc[1]);
    }
  };
  private setUpWebViewer(nativeElementToHook: HTMLElement): Promise<WebViewerInstance> {
    return new Promise((resolve, reject) => {
      WebViewer({
        // TODO make this path an input
        path: '../assets/webviewer/',
        fullAPI: true,
      }, nativeElementToHook).then(instance => {
        const { PDFNet, docViewer } = instance;
        const documentContainer = nativeElementToHook.querySelector('iframe').contentDocument.querySelector('.DocumentContainer');
        PDFNet.initialize().then(() => {
          // Sync all WebViewer instances when scroll changes
          (documentContainer as any).onscroll = () => {
            if ((!this.originalScroller || this.originalScroller === documentContainer)) {
              this.originalScroller = documentContainer;
              this.syncScrolls(documentContainer.scrollLeft, documentContainer.scrollTop);
              clearTimeout(this.scrollTimeout);
              this.scrollTimeout = setTimeout(() => {
                this.originalScroller = null;
              }, 50);
            }
          };
          docViewer.on('rotationUpdated', rotation => {
            this.syncRotation(rotation);
          });

          docViewer.on('pageNumberUpdated', pageNumber => {
            this.syncPageNumber(pageNumber);
          });

          docViewer.on('zoomUpdated', zoom => {
              // zoom events will also trigger a scroll event
              // set the original scroll to be the same panel that first triggers the zoom event
              // so that scroll events are handled properly and in the correct order
              // some browsers such as Chrome do not respect the scroll event ordering correctly
              if (!this.originalScroller) {
                this.originalScroller = documentContainer;
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                  this.originalScroller = null;
                }, 50);
              }
              this.syncZoom(zoom);
          });
          resolve(instance);
        });
      });
    });
  }

  // Synchronizes rotation of the page
  private syncRotation(rotation: number) {
    if (this.rightPanelInstance.docViewer.getRotation() !== rotation) {
      this.rightPanelInstance.docViewer.setRotation(rotation);
    }
    if (this.leftPanelInstance.docViewer.getRotation() !== rotation) {
      this.leftPanelInstance.docViewer.setRotation(rotation);
    }
    if (this.midPanelInstance.docViewer.getRotation() !== rotation) {
      this.midPanelInstance.docViewer.setRotation(rotation);
    }
  }
  
  private syncPageNumber(pageNumber: number) {
    if (this.rightPanelInstance.docViewer.getCurrentPage() !== pageNumber) {
      this.rightPanelInstance.docViewer.setCurrentPage(pageNumber);
    }
    if (this.leftPanelInstance.docViewer.getCurrentPage() !== pageNumber) {
      this.leftPanelInstance.docViewer.setCurrentPage(pageNumber);
    }
    if (this.midPanelInstance.docViewer.getCurrentPage() !== pageNumber) {
      this.midPanelInstance.docViewer.setCurrentPage(pageNumber);
    }
  }

  // Synchronizes scrolling of WebViewer instances
  private syncScrolls(scrollLeft, scrollTop) {
    for (const documentContainer of this.documentContainers) {
      if (!documentContainer) {
        return;
      }

      if (documentContainer.scrollLeft !== scrollLeft) {
        documentContainer.scrollLeft = scrollLeft;
      }

      if (documentContainer.scrollTop !== scrollTop) {
        documentContainer.scrollTop = scrollTop;
      }
    }
  }

  // Synchronizes zooming of WebViewer instances
  private syncZoom(zoom) {
    if (this.rightPanelInstance.getZoomLevel() !== zoom) {
      this.rightPanelInstance.setZoomLevel(zoom);
    }
    if (this.leftPanelInstance.getZoomLevel() !== zoom) {
      this.leftPanelInstance.setZoomLevel(zoom);
    }
    if (this.midPanelInstance.getZoomLevel() !== zoom) {
      this.midPanelInstance.setZoomLevel(zoom);
    }
  }
}