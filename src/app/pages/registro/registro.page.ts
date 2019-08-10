import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private toastCtrl: ToastController, private router: Router,
              private storage: Storage) {

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
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
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

  async registro() {
    this.appService.post('/registro_cliente', this.formGroup.value).then(async (data: any) => {
      const toast = await this.toastCtrl.create({
        message: `Bienvendio ${data.nombres}`,
        duration: 2000
      });
      toast.present();
      this.storage.set('cliente_id', data.id);
      this.router.navigate(['productos']);
    });
  }
}
