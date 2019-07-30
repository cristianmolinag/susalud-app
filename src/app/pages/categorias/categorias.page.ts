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

  categorias: Categoria[];
  colores: string[] = ['primary', 'secondary', 'tertiary', 'success', 'danger', 'light', 'medium', 'dark'];

  constructor(private appService: AppService, private router: Router) {
    this.getCategorias();
  }

  getCategorias() {
    this.appService.get('/get_categorias').then(async (data: any) => {
      if (!!data.data) {
        this.categorias = data.data;
      }
    });
  }

  seleccion(categoria: Categoria) {
    this.router.navigate([`categorias/${categoria.id}/productos`]);
  }

  ngOnInit() {
  }

}
