import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosActivosPage } from './pedidos-activos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosActivosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosActivosPage]
})
export class PedidosActivosPageModule {}
