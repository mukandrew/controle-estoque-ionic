import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  checkAuthState(): void {
    this.auth.authState.subscribe(user => {
      if (!user) {
        // Usuário não autenticado, redirecionar para a página de login
        this.router.navigate(['/login']);
      }
    });
  }

  canActivate(): Observable<boolean> | boolean {
    return this.auth.authState.pipe(
      take(1),
      map(user => !!user),
      map(loggedIn => {
        if (loggedIn) {
          // Usuário autenticado, permitir acesso à rota
          return true;
        } else {
          // Usuário não autenticado, redirecionar para a página de login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}