import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Job} from "../../model/job";
import {JobService} from "../../services/job.service";
import {UserService} from "../../services/user.service";
import {MenuItem} from "primeng/api";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit{
  job: Job = {ApplicantUsernames: [], Company: "", Description: "", ID: "", Location: "", Requirements: [], Salary: "", Title: ""}

  items: MenuItem[];
  activeTab: any;

  applicants: any[] = [];
  applicantsColumns: any;
  globalFilter: any;

  constructor(private route: ActivatedRoute, private jobService: JobService, private userService: UserService, private authService: AuthService) {
    this.items = [
      {label: 'Job details', icon: 'pi pi-fw pi-home'},
    ];

    this.applicantsColumns = [
      { field: 'username', header: 'Username' },
      { field: 'matches', header: 'Matches Requirements' },
    ];

    this.activeTab = this.items[0]
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const jobId = params.get('id')!;
      this.jobService.getJobById(jobId).then(x=> {
        this.job = x

        if(this.job.Company == this.authService.getUsername()){

          // Add applicants tab
          this.items = [
            ...this.items,
            {label: 'Applicants', icon: 'pi pi-fw pi-users'},
          ];
        }

        this.job.ApplicantUsernames.forEach(async username => {
          const user = await this.userService.getUserByName(username)
          const matches = this.userService.userMeetsSkillRequirements(user, this.job.Requirements)
          this.applicants.push({username: username, matches: matches})
        })
      })
    });
  }

  changeTab(item: MenuItem) {
    this.activeTab = item
  }
}
