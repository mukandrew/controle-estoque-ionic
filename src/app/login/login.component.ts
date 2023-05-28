import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isToastOpen: boolean = false;
  toastMessage: string = '';

  constructor(private auth: AngularFireAuth, private router: Router) {}

  login() {
    if (this.email == '' || this.password == '') {
      this.toastMessage = "Preencha e-mail e senha";
      this.setOpen(true);
      return;
    }

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.toastMessage = "Usuário/Senha incorretos";
        this.setOpen(true);
      });
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}
