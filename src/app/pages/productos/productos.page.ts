import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Producto } from 'src/app/interfaces/app';
import { AlertController, ToastController, ModalController } from '@ionic/angular';

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
  cliente_id: number;

  constructor(private route: ActivatedRoute, private appService: AppService,
    private alertCtrl: AlertController, private toastCtrl: ToastController,
    private storage: Storage, private router: Router,
    private modalCtrl: ModalController) {

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.urlImages = appService.urlImgProductos;
        this.getProductos();
        this.cliente_id = val;
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  async getMisPedidos() {
    return new Promise((resolve) => {
      this.appService.get(`/get_mis_pedidos/${this.cliente_id}`).then((data: any) => {
        resolve(data);
      });
    });
  }

  async getProductos() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.appService.get(`/get_productos/${params.get('id')}`).then((data: any) => {
          if (!!data.data) {
            this.productos = data.data;
            this.productos.forEach(el => {
              if (el.estado_pedido !== 'Pedido') {
                el.estado_pedido = 'Comprar';
              }
            });

            this.getMisPedidos().then((data: any) => {
              if (data) {
                data.forEach(element => {
                  const index = this.productos.findIndex(x => x.id === element.id);
                  this.productos[index].estado_pedido = 'Pedido';
                });
              }
            });
          }
        });
      }
    });
  }

  ngOnInit() {

  }

  async crearPedido(producto: Producto) {

    if (producto.estado_pedido === 'Pedido') {
      const toast = await this.toastCtrl.create({
        message: `El producto ya se encuentra ordenado para producción`,
        duration: 2000
      });
      toast.present();
    } else {

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
  }


}
