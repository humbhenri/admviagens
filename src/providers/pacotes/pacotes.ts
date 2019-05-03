import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the PacotesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PacotesProvider {

  constructor(public http: HttpClient, public afd: AngularFireDatabase) {
  }

  addPacote(pacote: {}) {
    if (this.afd.list('pacotes').push(pacote)) {
      return true;
    }
    return false;
  }

}
