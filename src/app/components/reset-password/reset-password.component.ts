import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { AlertService } from '../../core/services/alerts.service';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiBackService } from '../../core/services/api-back.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  formulario: FormGroup;
  encryptedToken!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private AlertService: AlertService,
    private apiBackService: ApiBackService
  ) {
    this.formulario = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator()
    })
  }

  // regla para validacion de contraseñas
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirm_password = control.get('confirm_password');

      if (!confirm_password || password?.value === confirm_password.value) {
        return null;
      }

      return { 'passwordMismatch': true };
    };
  }

  allFieldsValid: boolean = false;

  onSubmit() {
    this.allFieldsValid = true;

    this.activeRoute.params.subscribe(params => {
      this.encryptedToken = params['token'];
    });

    if (this.formulario.valid) {
      console.log('Formulario válido');

      const data = { ...this.formulario.value, token: this.encryptedToken }

      this.apiBackService.resetPassword(data).subscribe({
        next: response => {
          this.AlertService.showAlert(response.status, '¡Tu contraseña ha sido actualizada!', 1500);

          setTimeout(() => {
            window.location.href = '/login';
          }, 1500)
        },
        error: err => {
          console.error('Error en la llamada al backend:', err);
          this.AlertService.showAlert(err.status, err.error.error ?? err.error, 6000);
        }
      })
    } else {
      console.log('Formulario inválido');
      this.AlertService.showAlert(400, 'Llena primero todos los campos', 6000);
    }
  }

}
