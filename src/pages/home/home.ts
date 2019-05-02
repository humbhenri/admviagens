import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendasProvider } from '../../providers/vendas/vendas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  vendas: any[];

  constructor(public navCtrl: NavController, public vendasService: VendasProvider) {

  }

  ionViewWillEnter(){
    this.getVendas();
  }

  getVendas() {
    this.vendasService
      .getVendas()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(dados => {
        console.log(dados);
        this.vendas = dados;
      });
  }

}
