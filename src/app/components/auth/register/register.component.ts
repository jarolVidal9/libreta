import { Component, booleanAttribute } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

import { ApiBackService } from '../../../core/services/api-back.service';
import { AlertService } from '../../../core/services/alerts.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiBackService: ApiBackService,
    private AlertService: AlertService,
  ) {
    // creacion del formulario para los campos
    this.formulario = this.formBuilder.group({
      image: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      date_of_birth: ['', Validators.required],
      gender: ['', this.genderValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator()
    });
  }

  // Guardar la imagen seleccionada
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const inputElement = document.getElementById('profile_image') as HTMLInputElement;
      inputElement.value = ''; // evita que el navegador reaccione por inyeccion de formularios

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageDataUrl = e.target.result;

        this.showImagePreview(imageDataUrl);

        this.formulario.get('image')?.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  // Muestra la imagen en la vista previa usando la variable temporal
  showImagePreview(imageDataUrl: string): void {
    const previewElement = document.querySelector('.image-preview') as HTMLDivElement;
    previewElement.style.backgroundImage = `url(${imageDataUrl})`;
  }

  // Obtencion de la fecha (la persona debe tener al menos 10 años)
  getDate() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 10);

    return today.toISOString().split('T')[0];
  }

  // regla de validacion y arreglo para el campo genero
  genders = ['', 'Masculino', 'Femenino', '39 tipos de gay'];

  genderValidator(control: AbstractControl): ValidationErrors | null {
    const selectedValue = control.value;
    if (selectedValue === "") {
      return { required: true };
    }
    return null;
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

    if (this.formulario.valid) {
      console.log('Formulario válido');
      console.log(this.formulario.value);

      const formData = new FormData();
      const formValue = this.formulario.value;

      // Agrega cada valor del formulario al FormData
      Object.keys(formValue).forEach(key => {
        formData.append(key, formValue[key]);
      });

      // Llamada al servicio para enviar los datos al backend
      this.apiBackService.registerNewUser(formData).subscribe(
        {
          next: response => {

            this.AlertService.showAlert(response.status, '¡Te has registrado exitosamente!', 1500);
            setTimeout(() => {
              window.location.href = '/login';
            }, 1500)
          },
          error: err => {
            console.error('Error en la llamada al backend:', err);
            this.AlertService.showAlert(err.status, err.error.error ?? err.error, 6000);
          }
        }
      )
    }
    else {
      console.log('Formulario inválido');
      this.AlertService.showAlert(400, 'Llena primero todos los campos', 6000);
    }
  }
}

