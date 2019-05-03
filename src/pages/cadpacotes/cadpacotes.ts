import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { PacotesProvider } from "../../providers/pacotes/pacotes";
import { HomePage } from "../home/home";
import { Camera, CameraOptions } from "@ionic-native/camera";

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
  imagem: any = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pacotesProvider: PacotesProvider,
    public toastCtrl: ToastController,
    public camera: Camera,
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
        message: 'Pacote cadastrado :)',
        duration: 3000
      }).present();
      this.navCtrl.setRoot(HomePage);
    } else {
      this.toastCtrl.create({
        message: 'Erro ao cadastrar o pacote :<',
        duration: 3000
      }).present();
    }
  }

  getImagem() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.imagem = imageData;
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }
}
