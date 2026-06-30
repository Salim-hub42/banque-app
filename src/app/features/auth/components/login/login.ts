import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { form, required, email, minLength, FormField, FormRoot } from '@angular/forms/signals';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';




@Component({
  selector: 'app-login',
  imports: [  InputText, Button , FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export class Login {
  service = inject(AuthService)
   loginModel = signal({email: '' , password: ''});

   loginForm = form(this.loginModel, (field) => {
      required(field.email);
      email(field.email);
      required(field.password);
      minLength(field.password, 6);
   });

  
   

   onSubmit() {
     this.loginForm().markAsTouched();
if (!this.loginForm().valid()) return;
     this.service.login(this.loginModel().email, this.loginModel().password);
   }






}
