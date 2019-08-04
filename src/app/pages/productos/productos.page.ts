import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Producto } from 'src/app/interfaces/app';
import { AlertController, ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

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
              private storage: Storage, private router: Router) {

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.urlImages = appService.urlImages;
        this.getProductos();
        this.cliente_id = val;
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  async getPedidos() {
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
          // resolve(data);
          if (!!data.data) {
            this.productos = data.data;
            this.getPedidos().then((data: any) => {
              data.forEach(element => {
                const index = this.productos.findIndex(x => x.id === element.id);
                this.productos[index].estado_pedido = 'Pedido';
                this.productos.forEach(el => {
                  if (el.estado_pedido !== 'Pedido') {
                    el.estado_pedido = 'Comprar';
                  }
                });
              });
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

      const alert = await this.alertCtrl.create({
        header: '¿Desea confirmar el pedido?',
        inputs: [
          {
            name: 'observaciones',
            label: 'Observaciones:',
            type: 'text'
          }
        ],
        message: `<strong>Articulo</strong>: ${producto.articulo.nombre} <br>
                <strong>Precio</strong>: ${producto.precio} <br>
                <strong>Talla</strong>: ${producto.talla.nombre} <br>
                <strong>Material</strong>: ${producto.material.nombre} <br>
                <strong>Color</strong>: ${producto.color.nombre}`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Pedido cancelado');
            }
          }, {
            text: 'Aceptar',
            handler: (alertData) => {
              this.appService.post('/crear_pedido',
              {
                producto_id: producto.id,
                cliente_id: this.cliente_id,
                observaciones: alertData.observaciones
              })
                .then(async (data: any) => {
                  const toast = await this.toastCtrl.create({
                    message: `Pedido #${data.id} realizado con éxito`,
                    duration: 2000
                  });
                  toast.present();
                  this.getProductos();
                });
              console.log('Confirm Okay');
            }
          }
        ]
      });

      await alert.present();
    }
  }


}
