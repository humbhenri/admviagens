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

  constructor(
    public http: HttpClient,
    public afd: AngularFireDatabase) {
  }
  async addPacote(pacote: any) {
    try {
      await firebase.auth().signInAnonymously();
      const val = await this.afd.list('pacotes').push(pacote);
      console.log(JSON.stringify(val));
      const id = val.key;
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const filename = new Date().getTime() + '.png';
      const localPath = pacote.imagem;
      const fileType = 'image/png';
      const savedPicture = await storageRef.child(`pacotes/${id}/${filename}`)
        .putString(localPath, 'base64', { contentType: fileType });
      const url = await savedPicture.ref.getDownloadURL();
      console.log(`img url = ${url}`);
      pacote.imagem = url;
      await this.afd.object(`pacotes/${id}`).update(pacote);
    } catch (error) {
      console.error(error);
    }
  }

  getPacotes() {
    return this.afd.list('pacotes')
  }

}
