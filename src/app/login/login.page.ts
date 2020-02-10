import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessages = {
    mail: [
      { type: 'required', message: 'Ingrese un Email' },
      { type: 'email', message: 'El Email no es válido' }
    ],
    password: [
      { type: 'required', message: 'Ingrese una Contraseña' },
      { type: 'minlength', message: 'Mínimo 5 caracteres' }]
  };
  constructor(private formBuilder: FormBuilder, private router: Router, private navCtrl: NavController) {
    this.loginForm = this.formBuilder.group({
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
    });
  }

  loginUser(credentials) {
    console.log(credentials);
    this.navCtrl.navigateRoot('/menu/home');
  }
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
  ngOnInit() { }

}
