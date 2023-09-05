import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.service";
import {Certification} from "../../../model/certification";
import {CertificationService} from "../../../services/certification.service";
import {Form} from "@angular/forms";
import {MessageService} from "primeng/api";
import {User} from "../../../model/user";

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit{
  @Input() user: User = {Certifications: [], GithubProfile: "", GithubRepos: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}

  certificateModel: any = {};
  dialogVisible: boolean = false;

  certifications!: any[]
  cols: any;

  constructor(private authService: AuthService, private userService: UserService, private certificationService: CertificationService, private messageService: MessageService) {
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Issuer', header: 'Issuer' },
      { field: 'Date', header: 'Date Issued' },
      { field: 'Skills', header: 'Skills' },
    ];
  }

  onSubmit(formData: any) {
    const data = {
      Name: this.certificateModel.Name,
      Issuer: this.certificateModel.Issuer,
      IssueDate: this.certificateModel.IssueDate,
      Skills: this.certificateModel.Skills
    }

    const file = this.certificateModel.file;
    this.certificationService.uploadCertification(data, file, this.authService.getUsername()).then(r => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Certificate uploaded'})
      this.dialogVisible = false;
      this.certificateModel = {}
    })
  }


  onFileUpload(file: any) {
    this.certificateModel.file = file;
  }

  openNew() {
    this.dialogVisible = true
  }

  async ngOnInit() {
    this.certifications = this.user.Certifications.map((cert: Certification) => {
      return{
        Name: cert.Name,
        Issuer: cert.Issuer,
        Date: cert.IssueDate,
        Skills: Object.keys(cert.Skills)
      }
    })
  }

  createFormData(input: any): FormData {
    const formData = new FormData();
    formData.append('Name', input.Name);
    formData.append('Issuer', input.Issuer);
    formData.append('IssueDate', input.IssueDate);
    input.Skills.forEach((item: any, index: number) => {
      formData.append(`Skills[${index}]`, item);
    });
    return formData;
  }

}
