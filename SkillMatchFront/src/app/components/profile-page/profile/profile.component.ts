import {Component, Input, OnInit} from '@angular/core';
import {Repo, User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() githubProfile: string = '';
  @Input() user: User = {WorkExperiences: [], Certifications: [], GithubProfile: "", GithubRepos: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  @Input() data: Repo[] = [];

  editingGitHub: boolean = false

  cols!: ({ field: string; header: string })[];
  openTab: any = 0;

  constructor(private userService: UserService, private messageService: MessageService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
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
