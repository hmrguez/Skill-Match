// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7000';

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) {}



  public login(credentials: { Username: string; Password: string }): Promise<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).toPromise();
  }

  public register(credentials: { Username: string; Password: string }): Promise<any> {
    return this.http.post(`${this.apiUrl}/register`, credentials).toPromise();
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.getToken();
    return !this.jwtService.isTokenExpired(token || '');
  }

  public logout(): void {
    this.jwtService.removeToken();
    this.router.navigate(['/login'])
  }
}
