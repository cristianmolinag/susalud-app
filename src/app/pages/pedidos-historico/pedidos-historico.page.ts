import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/app';

@Component({
  selector: 'app-pedidos-historico',
  templateUrl: './pedidos-historico.page.html',
  styleUrls: ['./pedidos-historico.page.scss'],
})
export class PedidosHistoricoPage implements OnInit {

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
        this.pedidos = data;
      }
    });
  }

}
