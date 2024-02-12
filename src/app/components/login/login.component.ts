import { NgIf, } from '@angular/common';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiBackService } from '../../core/services/api-back.service';
import { AlertService } from '../../core/services/alerts.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {

  formulario!: FormGroup;

  showEmailValidation: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiBackService: ApiBackService,
    private AlertService: AlertService,
    private cookieServices: CookieService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  allFieldsValid: boolean = false;

  forgotPassword() {
    if (this.formulario.get('email')?.value === '') {
      this.showEmailValidation = true;
      return; 
    }
    const data = {
      email: this.formulario.get('email')?.value
    }

    this.apiBackService.forgotPassword(data).subscribe(
      {
        next: response => {

          this.AlertService.showAlert(response.status, 'A tu correo han llegado las intrucciones para reestablecer tu contraseña.', 4000);
        },
        error: err => {
          console.log(err)
          this.AlertService.showAlert(err.status, err.error?.message);
        }
      }
    );
  }

  onSubmit() {
    this.allFieldsValid = true;

    if (this.formulario.valid) {
      console.log('Formulario válido');
      console.log(this.formulario.value);

      this.apiBackService.login(this.formulario.value).subscribe(
        {
          next: response => {
            this.AlertService.showAlert(response.status, '¡Te has logueado exitosamente!', 1500);

            setTimeout(() => {
              const expirationDate = new Date();
              expirationDate.setHours(expirationDate.getHours() + 1);
              this.cookieServices.set("token", response.token, { expires: expirationDate });
              this.router.navigate(["menu/notes"]);
            }, 1500)

          },

          error: err => {
            console.error('Error en la llamada al backend:', err);
            this.AlertService.showAlert(err.status, err.error.error ?? err.error, 6000);

          }
        }
      )
    } else {
      console.log('Formulario inválido');
      this.AlertService.showAlert(400, 'Llena primero todos los campos', 6000);
    }
  }
}
