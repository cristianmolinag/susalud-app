import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = 'http://127.0.0.1:8000'; // http://susalud-admin.test -- 'https://susalud-admin.herokuapp.com/app'
  urlImgProductos = `${this.apiUrl}/imagenes/productos/`;

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
