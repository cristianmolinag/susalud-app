import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosHistoricoPage } from './pedidos-historico.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosHistoricoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosHistoricoPage]
})
export class PedidosHistoricoPageModule {}
