import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Categoria } from './../../interfaces/app';
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  urlImages: string;
  categorias: Categoria[];
  colores: string[] = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'light', 'medium', 'dark'];

  constructor(private appService: AppService, private router: Router) {
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

}
