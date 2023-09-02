import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Repo, User} from "../../model/user";
import {UserService} from "../../services/user.service";
import { MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  githubProfile!: string;
  user: User = {GithubProfile: "", GithubRepos: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>(),}

  editingGitHub: boolean = false

  cols!: ({ field: string; header: string })[];
  data!: Repo[];

  constructor(private userService: UserService, private messageService: MessageService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username')!;
      this.userService.getUserByName(username).then(user => {
        this.user = user
        this.githubProfile = this.user.GithubProfile
        this.data = this.user.GithubRepos
      })
    });

    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Description', header: 'Description' },
    ];

  }

  startEditingGitHub() {
    this.editingGitHub = true
  }

  saveGitHubChanges() {
    this.user.GithubProfile = this.githubProfile
    this.userService.updateUser(this.user.Name, this.user).then(r =>
      {
        this.messageService.add({severity:'success', summary:'Success', detail:'GitHub profile updated'})
      }
    )
  }

  cancelEditingGitHub() {
    this.githubProfile = this.user.GithubProfile;
    this.editingGitHub = false
  }
}
