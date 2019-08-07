import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Categoria } from './../../interfaces/app';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  urlImages: string;
  categorias: Categoria[];
  colores: string[] = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'light', 'medium', 'dark'];

  constructor(private appService: AppService,
    private router: Router,
    private storage: Storage,
    private actionSheetCtrl: ActionSheetController) {


    this.urlImages = appService.urlImgCategorias;
    this.getCategorias();
  }

  getCategorias() {
    return new Promise((resolve) => {
      this.appService.get('/get_categorias').then(async (data: any) => {
        if (!!data.data) {
          this.categorias = data.data;
        }
      });
      return resolve();
    });
  }

  seleccion(categoria: Categoria) {
    this.router.navigate([`categorias/${categoria.id}/productos`]);
  }

  ngOnInit() {
  }

  buscar(event: any) {
    console.log(event.detail.value.toLowerCase());
  }

  refrescar(event: any) {
    this.getCategorias().then(() => {
      event.target.complete();
    });
  }

  async opcionesUsuario() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones del usuario',
      buttons: [
        {
          text: 'Perfil',
          icon: 'contact',
          handler: () => {
            this.router.navigate(['perfil']);
          }
        }, {
          text: 'Cerrar sesion',
          icon: 'exit',
          handler: () => {
            this.storage.remove('cliente_id').then();
            this.router.navigate(['home']);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async opcionesPedidos() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones del pedidos',
      buttons: [
        {
          text: 'Mis pedidos activos',
          icon: 'card',
          handler: () => {
            this.router.navigate(['pedidos-activos']);
          }
        }, {
          text: 'Historico de pedidos',
          icon: 'calendar',
          handler: () => {
            this.router.navigate(['pedidos-historico']);
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
