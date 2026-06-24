import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Password, InputText, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

   fb = inject(FormBuilder);
   form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
   });

    //En attentte d'un service ...
   onSubmit() {
     this.form.markAllAsTouched()
     if(this.form.invalid) return
     console.log(this.form.value)

   }






}
