import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Producto } from 'src/app/interfaces/app';
import { ToastController, ModalController, ActionSheetController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  urlImages: string;
  productos: Producto[];
  clienteId: number;

  constructor(private appService: AppService,
              private toastCtrl: ToastController,
              private storage: Storage, private router: Router,
              private modalCtrl: ModalController,
              private actionSheetCtrl: ActionSheetController) {

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.urlImages = appService.urlImgProductos;
        this.clienteId = val;
        this.getProductos();
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  async getProductos() {
    this.appService.get(`/get_productos`).then((data: any) => {
      if (!!data.data) {
        this.productos = data.data;
      }
    });
  }

  ngOnInit() {

  }

  async crearPedido(producto: Producto) {

    const modal = await this.modalCtrl.create({
      component: ModalPedidoPage,
      componentProps: {
        producto
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (!!data) {
      const toast = await this.toastCtrl.create({
        message: `Pedido realizado con exito`,
        duration: 2000
      });
      toast.present();
      this.getProductos();
    }

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
