import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  submitForm(){
    if (!this.loginForm.valid) {
      alert("Logowanie nieudane.");
      return;
    }
    let login = this.loginForm.get('login')!.value!;
    let pass = this.loginForm.get('password')!.value!;
    this.auth.login(login, pass);
    this.loginForm.reset();
  }

}