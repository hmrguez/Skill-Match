import {Component, Input, OnInit} from '@angular/core';
import {Project, User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {getSkillRanks, Rank} from "../../../data/rank";
import {first, max, min, Subscription} from "rxjs";
import {objectToMap} from "../../../helper/objectToMap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() githubProfile: string = '';
  @Input() user: User = {Email: '', Streak: 0, Summary:'', WorkExperiences: [], Certifications: [], GithubProfile: "", Projects: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  @Input() data: Project[] = [];
  @Input() loggedInUser: boolean = false;

  editing: boolean = false
  editModel: any = {}

  topThreeSkills: [string,number, Rank][] = [];
  restOfSkills: [string,number, Rank][] = [];

  graphData: any;
  graphOptions: any;


  constructor(private userService: UserService, private messageService: MessageService) { }

  async ngOnInit(): Promise<void> {
    this.user.TotalSkills = objectToMap(this.user.TotalSkills)
    this.editModel = {...this.user}
    this.getSkillsData();

    this.graphData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [2, 3, 3, 4, 1, 5, 6]
            },
        ]
    };

      this.graphOptions = {
          scale: {
              ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 5,
                  stepSize: 1
              },

          },
          plugins: {
              legend: {
                  display: false,
              },
          }
      };
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

  getSkillsData(){
    const sortedSkills = getSkillRanks(this.user.TotalSkills)
    const firstThree = Math.min(3, sortedSkills.length)
    for (let i = 0; i < firstThree; i++)
      this.topThreeSkills.push(sortedSkills[i])

    if(firstThree != 3) return;
    for (let i = 3; i < sortedSkills.length; i++) {
      this.restOfSkills.push(sortedSkills[i])
    }
  }
}
