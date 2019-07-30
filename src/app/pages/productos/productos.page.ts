import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Producto } from 'src/app/interfaces/app';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  urlImages: string;
  productos: Producto[];

  constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {
    this.urlImages = appService.urlImages;

    this.getProductos().then((data: any) => {
      if (!!data.data) {
        this.productos = data.data;
        console.log(this.productos);
      }
    });
  }

  async getProductos() {
    return new Promise((resolve) => {
      this.route.paramMap.subscribe(params => {
        if (params.has('id')) {
          this.appService.get(`/get_productos/${params.get('id')}`).then((data: any) => {
            resolve(data);
          });
        }
      });
    });
  }

  ngOnInit() {

  }

}
