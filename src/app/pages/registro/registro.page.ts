import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private appService: AppService) {

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

  registro() {
    this.appService.post('/registro_cliente', this.formGroup.value).then((data: any) => {
      console.log('data: ', data);
    });
  }
}
