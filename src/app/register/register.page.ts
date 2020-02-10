import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  validationMessages = {
    mail: [
      { type: 'required', message: 'Ingrese un Email' },
      { type: 'email', message: 'El Email no es válido' }
    ],
    name: [
      { type: 'required', message: 'Llene este campo' },
      { type: 'minlength', message: 'Mínimo 3 caracteres' },
      { type: 'maxlength', message: 'No más de 20 caracteres' },
      { type: 'pattern', message: 'Sólo permite letras' },
    ],
    lastName: [
      { type: 'required', message: 'Llene este campo' },
      { type: 'minlength', message: 'Mínimo 3 caracteres' },
      { type: 'maxlength', message: 'No más de 20 caracteres' },
      { type: 'pattern', message: 'Sólo permite letras' },
    ],
    password: [
      { type: 'required', message: 'Ingrese una Contraseña' },
      { type: 'minlength', message: 'Mínimo 5 caracteres' }]
  };
  constructor(private formBuilder: FormBuilder, private router: Router, private navCtrl: NavController) {
    this.registerForm = this.formBuilder.group({
      mail: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.email
        ])),
      password: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])),
      name: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          // Esta secuencia permite ingresar letras con y sin tildes, y Ñ.
          Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
        ])),
      lastName: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')
        ])),
    });
  }

  registerUser(credentials) {
    console.log(credentials);
    this.navCtrl.navigateRoot('/menu/home');
  }
  back() {
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

}
