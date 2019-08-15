import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

/**
 * https://github.com/angular/angularfire2
 */

@Injectable({
  providedIn: 'root',
})
export class DrawingService {

  constructor(private afStorage: AngularFireStorage) {

  }

  saveDrawingForUser(userName: string, drawing: Blob) {
    // create a reference to the storage bucket location
    const ref = this.afStorage.ref(userName);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    const task = ref.put(drawing);

    return task.snapshotChanges();
  }

  downloadDrawingForUser(userName: string) {
    const ref = this.afStorage.ref(userName);
    return ref.getDownloadURL();
  }

}