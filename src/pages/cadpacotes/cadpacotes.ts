import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { PacotesProvider } from "../../providers/pacotes/pacotes";
import { HomePage } from "../home/home";

/**
 * Generated class for the CadpacotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-cadpacotes",
  templateUrl: "cadpacotes.html"
})
export class CadpacotesPage {
  titulo: string;
  descricao: string;
  valor: number;
  imagem: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pacotesProvider: PacotesProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CadpacotesPage");
  }

  cadastrar() {
    const ok = this.pacotesProvider.addPacote({
      titulo: this.titulo,
      descricao: this.descricao,
      valor: this.valor,
      imagem: this.imagem
    });
    if (ok) {
      this.toastCtrl.create({
        message: 'Pacote cadastrado :)'
      }).present();
      this.navCtrl.setRoot(HomePage);
    } else {
      this.toastCtrl.create({
        message: 'Erro ao cadastrar o pacote :<'
      }).present();
    }
  }
}
