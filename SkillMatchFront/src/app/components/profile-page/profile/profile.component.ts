import {Component, Input, OnInit} from '@angular/core';
import {Project, User} from "../../../model/user";
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
  @Input() user: User = {Email: '', Summary:'', WorkExperiences: [], Certifications: [], GithubProfile: "", Projects: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  @Input() data: Project[] = [];

  editing: boolean = false
  editModel: any = {}

  constructor(private userService: UserService, private messageService: MessageService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.editModel = {...this.user}
  }

  saveChanges() {
    this.userService.updateUser(this.user.Name, this.editModel).then(r =>
      {
        this.messageService.add({severity:'success', summary:'Success', detail:'Profile updated'})
        this.user = this.editModel
        this.editing = false
      }
    )
  }

  cancelEditing() {
    this.editing = false
    this.editModel = { ... this.user}
  }

  startEditing() {
    this.editModel = {...this.user}
    this.editing = true
  }
}
