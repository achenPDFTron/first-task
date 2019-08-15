import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  saveDrawing(userName: string, drawing: Blob) {
    // create a reference to the storage bucket location
    const ref = this.afStorage.ref(userName);
    // the put method creates an AngularFireUploadTask
    // and kicks off the upload
    const task = ref.put(drawing);

    return task.snapshotChanges();
  }

}