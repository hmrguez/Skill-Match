import {Component, Input} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";
import {User} from "../../../model/user";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent{
  @Input() user: User = {} as User
  @Input() data: any[] = [];
  @Input() loggedInUser: boolean = false;
  model: any = {};
  dialogVisible: boolean = false;
  cols: any;

  constructor(private userService: UserService, private messageService: MessageService) {
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
    this.userService.updateUser(this.user.Name, this.user).then(_ =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Project uploaded'})
      this.dialogVisible = false;
      this.model = {}
    })
  }

  openNew() {
    this.dialogVisible = true
  }
}
