import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/app';

@Component({
  selector: 'app-pedidos-activos',
  templateUrl: './pedidos-activos.page.html',
  styleUrls: ['./pedidos-activos.page.scss'],
})
export class PedidosActivosPage implements OnInit {

  clienteId: number;
  pedidos: Pedido[];
  constructor(private appService: AppService, private storage: Storage, private router: Router) {

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.clienteId = val;
        this.getMisPedidos();
      } else {
        this.router.navigate(['home']);
      }
    });

  }

  ngOnInit() {
  }

  getMisPedidos() {

    this.appService.get('/get_mis_pedidos/' + this.clienteId).then((data: any) => {
      if (!!data) {
        console.log(data);
        this.pedidos = data.filter((p: Pedido) => {
          return p.estado !== 'Facturado' && p.estado !== 'Cancelado';
        });
      }
    });
  }

}
