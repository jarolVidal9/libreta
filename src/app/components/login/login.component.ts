import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
    });
  }

  // Acción cuando se envía el formulario
  onSubmit() {
    if (this.formulario.valid) {
      // Realizar acciones cuando el formulario es válido
      console.log('Formulario válido');
      console.log(this.formulario.value);
    } else {
      // Mostrar mensajes de error o realizar acciones para formularios inválidos
      console.log('Formulario inválido');
      alert("Llena primero todos los campos")
    }
  }
}
