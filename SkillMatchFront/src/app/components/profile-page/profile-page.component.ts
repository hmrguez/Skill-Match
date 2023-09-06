import {Component, OnInit} from '@angular/core';
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
  user: User = { Email: '',WorkExperiences: [], Certifications: [], GithubProfile: "", Projects: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  openTab: number = 0;

  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute) {
    this.userService.getUserByName(this.authService.getUsername()).then(user=>{
      this.user = user
    })
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username')!;
      this.userService.getUserByName(username).then(user => {
        this.user = user
      })
    });
  }
}
