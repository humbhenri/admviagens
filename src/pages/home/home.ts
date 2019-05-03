import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { VendasProvider } from '../../providers/vendas/vendas';
import { PacotesProvider } from '../../providers/pacotes/pacotes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  vendas: any[];
  pacotes: any[];

  constructor(
    public navCtrl: NavController, 
    public vendasService: VendasProvider, 
    public pacotesProvider: PacotesProvider,
    public loadingCtrl: LoadingController) {

  }

  ionViewWillEnter() {
    this.getPacotes();
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

  getPacotes() {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.pacotesProvider.getPacotes()
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe(dados => {
        console.log(dados);
        this.pacotes = dados;
        loader.dismiss();
      })
  }

}
