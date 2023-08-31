import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {JwtService} from "../../services/jwt.service";
import {Message, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  openTab: number = 0;

  username: string = ""
  password: string = ""
  confirmPassword: string = ""

  constructor(private authService: AuthService, private jwtService: JwtService, private messageService: MessageService, private router: Router) { }

  async registerUser() {

    if(this.password != this.confirmPassword) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Passwords do not match'})
      return
    }

    this.authService.register({Username: this.username, Password: this.password}).then(r =>
      {
        this.messageService.add({severity:'success', summary:'Success', detail:'Registered in successfully'})
        this.loginUser()
      }
    )
  }

  async loginUser() {
    this.authService.login({Username: this.username, Password: this.password}).then(r =>
      {
        this.jwtService.setToken(r.token)
        this.messageService.add({severity:'success', summary:'Success', detail:'Logged in successfully'})
        this.router.navigate(['/dashboard'])
      }
    )
  }
}
