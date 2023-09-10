import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  user: User = {} as User
  openTab: number = 0;
  loggedInUsername: string = '';


  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {
    this.userService.getUserByName(this.authService.getUsername()).then(user=>{
      this.user = user
    })
  }

  async ngOnInit(): Promise<void> {
    this.loggedInUsername = this.authService.getUsername()
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username')!;
      this.userService.getUserByName(username).then(user => {
        this.user = user
      })
    });
  }
}
