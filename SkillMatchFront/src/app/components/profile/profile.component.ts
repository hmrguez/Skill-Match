import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  username!: string;
  githubProfile!: string;
  user!: User

  editingGitHub: boolean = false

  constructor(private authService: AuthService, private userService: UserService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.username = this.authService.getUsername()
    this.user = await this.userService.getUserByName(this.username)
    this.githubProfile = this.user.GithubProfile
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
