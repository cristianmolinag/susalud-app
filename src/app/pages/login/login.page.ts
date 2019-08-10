import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
              private toastCtrl: ToastController, private router: Router,
              private storage: Storage) {

    this.loginForm = this.formBuilder.group({
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]))
    });
  }

  ngOnInit() {
  }

  async login() {
    this.appService.post('/login', this.loginForm.value).then(async (data: any) => {
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
