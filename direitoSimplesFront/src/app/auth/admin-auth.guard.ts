import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const token = this.authService.getAuthToken();
    if (this.authService.isTokenValid(token)) {
      return true;
    }
    this.router.navigate(['/admin/login']);
    return false;
  }
}

