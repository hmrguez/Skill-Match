import {Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job, Requirement} from "../../model/job";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {findXpForRanks, Rank, rankOrder, rankXpMap} from "../../data/rank";
import {Table} from "primeng/table";
import {ApplicationService} from "../../services/application.service";
import {AuthService} from "../../services/auth.service";
import {TabMenu} from "primeng/tabmenu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild("dt") Table!: Table
  @ViewChild("tm") TabMenu!: TabMenu

  cols: any;
  jobs: any;

  model!: Job

  isFilter: boolean = false

  submitted!: boolean;
  productDialog!: boolean;
  rankOptions: any[] = []
  selectedMinRank!: Rank;
  selectedMaxRank!: Rank;
  selectedSkill!: string;

  items!: MenuItem[];
  activeItem: MenuItem;

  selectedJob: any;


  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
    )
  {

    this.cols = [
      {field: 'Title', header: 'Title'},
      {field: 'Description', header: 'Description'},
      {field: 'Location', header: 'Location'},
      {field: 'Salary', header: 'Salary'},
      {field: 'Company', header: 'Company'},
    ]

    this.items = [
      {label: 'All Jobs', icon: 'pi pi-fw pi-home'},
      {label: 'My postings', icon: 'pi pi-fw pi-calendar'},
      {label: 'My applications', icon: 'pi pi-fw pi-pencil'},
    ];

    this.activeItem = this.items[0];
    for (const [rank, lowerBound] of rankXpMap) {
      this.rankOptions.push(rank)
    }
  }

  ngOnInit() {
    this.setupData()
  }

  openNew() {
    this.model = {
      Company: this.authService.getUsername(), Description: "", ID: "", Location: "", Requirements: [], Salary: "", Title: "", ApplicantUsernames: []
    };
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveJob() {
    this.submitted = true;
    this.jobService.createJob(this.model).then(x => {
      this.messageService.add({severity: "success", summary: "Success", detail: "Job posted"})
      this.setupData()
    })

    this.productDialog = false
  }

  saveRequisite() {
    if(this.selectedSkill == '') return
    const [min, max] = this.getXpRange()
    const requirement: Requirement = {
      Skill: this.selectedSkill,
      Max: max,
      Min: min
    }
    this.model.Requirements.push(requirement)
  }

  getXpRange(): [number, number] {
    let maxIndex = -1;
    let i = 0;

    for (const [rank, xp] of rankXpMap) {
      if (rank == this.selectedMaxRank) maxIndex = i;
      i++;
    }

    let lowerBound = rankXpMap.get(this.selectedMinRank);
    if (maxIndex == rankOrder.length - 1) return [lowerBound!, -1]
    let upperBound = rankXpMap.get(rankOrder[maxIndex + 1])! - 1
    return [lowerBound!, upperBound]
  }

  openNewFilter() {
    this.isFilter = true;
    this.openNew()
  }

  searchFilter() {

    const filter = this.createMongoDBFilter(this.model)
    this.jobService.searchJob(filter).then(jobs => {
      this.setupData(jobs)
    })


    this.isFilter = false;
    this.hideDialog()
  }

  createMongoDBFilter(model: Job) {
    const filter: any = {
      $or: [],
    };

    // Title condition
    if (model.Title !== '') {
      filter.$or.push({ "title": model.Title });
    }

    // Description condition
    if (model.Description !== '') {
      filter.$or.push({ "description": model.Description });
    }

    // Salary condition
    if (model.Salary !== '') {
      filter.$or.push({ "salary": model.Title });
    }

    // Location condition
    if (model.Location !== '') {
      filter.$or.push({ "location": model.Location });
    }

    // Requirements condition
    if (model.Requirements && Array.isArray(model.Requirements)) {
      model.Requirements.forEach((requirement: any) => {
        const requirementFilter: any = {
          "requirements": {
            $elemMatch: {
              "skill": requirement.Skill,
            },
          },
        };

        if (requirement.Min !== undefined && requirement.Min !== -1) {
          requirementFilter.Requirements.$elemMatch.min = { $exists: true, $gte: requirement.Min };
        }

        if (requirement.Max !== undefined && requirement.Max !== -1) {
          requirementFilter.Requirements.$elemMatch.max = { $exists: true, $lte: requirement.Max };
        }

        filter.$or.push(requirementFilter);
      });
    }

    return filter;
  }

  getIncludeRegex(value: string){
    return `/.*${value}.*/i`
  }

  apply(jobId: string) {
    const application = {
      Username: this.authService.getUsername(),
      JobId: jobId
    }
    this.applicationService.createApplication(application).then(() =>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application created'})
      this.setupData()
    })
  }

  setupData(jobs: Job[] | undefined =  undefined){
    if(jobs != undefined){
      this.jobs = jobs.map(job => {
        return{
          ...job,
          userApplied: job.ApplicantUsernames?.includes(this.authService.getUsername()) ?? false
        }
      })
    }
    else {
      this.jobService.getAllJobs().then(jobs => {
        this.jobs = jobs.map(job => {
          return{
            ...job,
            userApplied: job.ApplicantUsernames?.includes(this.authService.getUsername()) ?? false
          }
        })
      })
    }
  }

  removeApplication(jobId: any) {
    const application = {
      Username: this.authService.getUsername(),
      JobId: jobId
    }
    this.applicationService.deleteApplication(application).then(() =>{
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Application deleted'})
      this.setupData()
    })
  }

  async changeTab(event: MenuItem) {
    this.activeItem = event
    if(this.activeItem == this.items[0]){
      this.setupData()
    } else if(this.activeItem == this.items[1]){
      const jobs = (await this.jobService.getAllJobs()).filter(x=>x.Company == this.authService.getUsername())
      this.setupData(jobs)
    } else{
      const jobs = (await this.jobService.getAllJobs()).filter(x=>x.ApplicantUsernames?.includes(this.authService.getUsername()))
      this.setupData(jobs)
    }
  }

  onRowSelect(event: any) {
    let jobId = event.data.ID
    this.router.navigate([`/jobs/details/${jobId}`])
  }
}
