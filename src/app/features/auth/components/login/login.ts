import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Password, InputText, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
   private authService = inject(AuthService);
   private fb = inject(FormBuilder);
   form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
   });

   
   onSubmit() {
     this.form.markAllAsTouched()
     if(this.form.invalid) return
     this.authService.login(this.form.value.email!, this.form.value.password!);

   }






}
