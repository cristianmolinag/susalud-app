import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // apiUrl = 'https://susalud-admin.herokuapp.com/app'; // cambiar la IP por la nueva
  apiUrl = 'http://susalud-admin.test'; // cambiar la IP por la nueva  
  urlImgProductos = `${this.apiUrl}/imagenes/productos/`;
  urlImgCategorias = `${this.apiUrl}/imagenes/categorias/`;

  constructor(private httpClient: HttpClient, private toastCtrl: ToastController) {
  }

  post(url: string, data: any) {
    return new Promise((resolve) => {
      this.httpClient.post(`${this.apiUrl}/app${url}`, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
        .subscribe(respuesta => {
          resolve(respuesta);
        }, (error) => {
          this.mostrarError(error);
        });
    });
  }

  get(url: string) {
    return new Promise((resolve) => {
      this.httpClient.get(`${this.apiUrl}/app${url}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
        .subscribe(respuesta => {
          resolve(respuesta);
        }, (error) => {
          this.mostrarError(error);
        });
    });
  }

  async mostrarError(error: any) {
    const toast = await this.toastCtrl.create({
      message: `error: ${error.status}, ${error.error.message}`,
      duration: 2000
    });
    toast.present();
  }
}
