import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  constructor(private auth: AuthService) {}

  registerForm = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email, 
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
  });

  submitForm() {
    if (!this.registerForm.valid) {
      alert("Wprowadzono błędne dane");
      return;
    }
    let email = this.registerForm.get('email')!.value!;
    let pass = this.registerForm.get('password')!.value!;
    this.auth.register(email, pass);
    alert("Stworzono nowe konto!");
    this.registerForm.reset();
  }
}
