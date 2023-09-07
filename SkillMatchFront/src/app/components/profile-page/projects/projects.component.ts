import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {Certification} from "../../../model/certification";
import {CertificationService} from "../../../services/certification.service";
import {MessageService} from "primeng/api";
import {User} from "../../../model/user";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent{
  @Input() user: User = {Email: '', Summary:'',  WorkExperiences: [], Certifications: [], GithubProfile: "", Projects: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  @Input() data: any[] = [];
  model: any = {};
  dialogVisible: boolean = false;
  cols: any;

  constructor(private authService: AuthService, private userService: UserService, private certificationService: CertificationService, private messageService: MessageService) {
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Description', header: 'Description' },
      { field: 'Url', header: 'URL' },
      { field: 'Skills', header: 'Skills' },
    ];
  }

  onSubmit() {
    if(this.user.Projects == undefined) this.user.Projects = []
    this.user.Projects.push(this.model)


    console.log(this.model)
    this.userService.updateUser(this.user.Name, this.user).then(r =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Project uploaded'})
      this.dialogVisible = false;
      this.model = {}
    })
  }

  openNew() {
    this.dialogVisible = true
  }
}
