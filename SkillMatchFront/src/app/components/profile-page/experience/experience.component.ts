import {Component, Input} from '@angular/core';
import {User, WorkExperience} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  @Input() user: User = {} as User
  @Input() data: any[] = [];
  cols: any[] = [];
  dialogVisible: boolean = false;
  model: WorkExperience = {Company: "", Description: "", EndDate: "", StartDate: "", Title: ""}
  @Input() loggedInUser: boolean = false

  constructor(private userService: UserService, private messageService: MessageService) {
    this.cols = [
      {field: 'Title', header: 'Title'},
      {field: 'Company', header: 'Company'},
      {field: 'Description', header: 'Description'},
      {field: 'StartDate', header: 'StartDate'},
      {field: 'EndDate', header: 'EndDate'},
    ]
  }

  async onSubmit() {
    if(this.user.WorkExperiences == undefined){
      this.user.WorkExperiences = []
    }
    this.user.WorkExperiences.push(this.model)

    try{
      console.log(this.user)
      await this.userService.updateUser(this.user.Name, this.user)
    } catch (e) {
      this.messageService.add({severity: 'danger', summary: 'Error while updating user'})
    } finally {
      this.dialogVisible = false
    }
  }

  openNew() {
    this.dialogVisible = true;
    this.model = {Company: "", Description: "", EndDate: "", StartDate: "", Title: ""}
  }
}
