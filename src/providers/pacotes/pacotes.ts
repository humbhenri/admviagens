import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the PacotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacotesProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
  }

  addPacote(pacote: any) {
    const novo = this.afd.list('pacotes').push(pacote);
    if (novo) {
      const id = novo.key;
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const filename = new Date().getTime() + '.png';
      const localPath = pacote.imagem;
      const fileType = 'image/png';
      return storageRef.child(`pacotes/${id}/${filename}`)
        .putString(localPath, 'base64', { contentType: fileType })
        .then(savedPicture => {
          savedPicture.ref.getDownloadURL().then(downloadURL => {
            pacote.imagem = downloadURL;
            if (this.afd.object(`pacotes/${id}`).update(pacote)) {
              return true;
            }
            return false;
          });
        });
    }
    return false;
  }

  getPacotes() {
    return this.afd.list('pacotes')
  }

}
