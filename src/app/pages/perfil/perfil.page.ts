import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  clienteId: number;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router,
              private storage: Storage, private toastCtrl: ToastController) {

    this.storage.get('cliente_id').then((val) => {
      if (val) {
        this.clienteId = val;
        this.getCliente();
      } else {
        this.router.navigate(['home']);
      }
    });

    this.formGroup = this.formBuilder.group({
      nombres: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z -]+$')
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z -]+$')
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.email
      ])),
      documento: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      direccion: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ])),
      cod_postal: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8)
      ])),
      telefono: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(10)
      ]))
    });
  }

  ngOnInit() {
  }

  getCliente() {
    this.appService.get('/show_cliente/' + this.clienteId).then((data: any) => {
      console.log(data);

      if (!!data) {
        this.formGroup.setValue(
          {
            nombres: data.nombres,
            apellidos: data.apellidos,
            correo: data.correo,
            documento: data.documento,
            direccion: data.direccion,
            cod_postal: data.cod_postal,
            telefono: data.telefono
          }
        );
      }
    });
  }

  async registro() {
    console.log(this.formGroup.value);
    this.appService.post('/actualizar_cliente/' + this.clienteId, this.formGroup.value).then(async (data: any) => {
      const toast = await this.toastCtrl.create({
        message: `Usuario actualizado con exito`,
        duration: 2000
      });
      toast.present();
    });
  }

}
