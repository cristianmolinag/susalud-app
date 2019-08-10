import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/interfaces/app';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal-pedido',
  templateUrl: './modal-pedido.page.html',
  styleUrls: ['./modal-pedido.page.scss'],
})
export class ModalPedidoPage implements OnInit {


  @Input() producto: Producto;
  cantidad: number;
  color_id: number;
  talla_id: number;
  observaciones: string;
  urlImageProducto: string;
  cliente_id: number;

  constructor(private appService: AppService, private modalCtrl: ModalController, private storage: Storage) {
    this.urlImageProducto = appService.urlImgProductos;
    this.cantidad = 1;

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.cliente_id = val;
      }
    });
  }


  confirmarPedido() {

    this.appService.post('/crear_pedido',
      {
        producto_id: this.producto.id,
        cliente_id: this.cliente_id,
        color_id: this.color_id,
        talla_id: this.talla_id,
        observaciones: this.observaciones,
        cantidad: this.cantidad,
      })
      .then(async (data: any) => {
        console.log(data);
        this.modalCtrl.dismiss({
          confirmado: true
        });
      });
  }

  cancelarPedido() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  validarFormulario() {
    if (this.cantidad && this.color_id && this.talla_id) {
      return false;
    }
    return true;
  }

}
