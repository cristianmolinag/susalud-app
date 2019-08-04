import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductosPage } from './productos.page';
import { ModalPedidoPage } from '../modal-pedido/modal-pedido.page';
import { ModalPedidoPageModule } from '../modal-pedido/modal-pedido.module';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  }
];

@NgModule({
  entryComponents:[
    ModalPedidoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ModalPedidoPageModule
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}
