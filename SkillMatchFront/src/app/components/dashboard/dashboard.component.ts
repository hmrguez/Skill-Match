import { Component } from '@angular/core';
import {FileUploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  certificate: any = {};

  onSubmit(formData: any) {
    // Handle form submission here, e.g., send the data to an API
    console.log(this.certificate);
  }

  onImageChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.certificate.image = fileList[0];
    }
  }

  onFileUpload(file: any) {
    this.certificate.file = file;
    console.log(this.certificate)
  }
}
