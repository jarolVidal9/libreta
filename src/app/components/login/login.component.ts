import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,  Validators,  ReactiveFormsModule, FormControl,} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiBackService } from '../../core/services/api-back.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiBackService:ApiBackService, private cookieServices:CookieService, private router: Router) {
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
      this.apiBackService.login(this.formulario.value).subscribe(
        (response)=>{
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          this.cookieServices.set("token",response.token,{ expires:expirationDate})
          this.router.navigate(["menu/notes"])
        },
        (error)=>console.error(error)
      )
    } else {
      // Mostrar mensajes de error o realizar acciones para formularios inválidos
      console.log('Formulario inválido');
      alert("Llena primero todos los campos")
    }
  }
}
