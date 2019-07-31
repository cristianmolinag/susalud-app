import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private toastCtrl: ToastController, private router: Router) {

    this.formGroup = this.formBuilder.group({
      nombres: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z -]+$')
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
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
      this.appService.setClienteID(data.id);
      this.router.navigate(['categorias']);
    });
  }
}
