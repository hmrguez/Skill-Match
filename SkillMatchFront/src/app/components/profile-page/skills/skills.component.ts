import {Component, Input, OnInit} from '@angular/core';
import {Skill} from "../../../model/skill";
import {User} from "../../../model/user";
import {SkillSource} from "../../../model/skillSource";
import {UserService} from "../../../services/user.service";
import {getRankInfoFromXP} from "../../../data/rank";
import {AuthService} from "../../../services/auth.service";

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit{
  @Input() user: User = {WorkExperiences: [],Certifications: [], GithubProfile: "", GithubRepos: [], JobsAppliedIds: [], Name: "", SkillSources: [], TotalSkills: new Map<string, number>()}
  headerArray: Column[] = [];
  skillArray: Skill[] = [];

  constructor(private userService: UserService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    const userName = this.authService.getUsername()
    this.user = await this.userService.getUserByName(userName)
    const temp = this.getUserTableData(this.user);
    this.headerArray = temp[0];
    this.skillArray = temp[1]
  }

  getUserTableData(user: User): [Column[], Skill[]] {
    const columns: Column[] = [
      { field: 'name', header: 'Name' },
      { field: 'rank', header: 'Rank'},
      { field: 'progress', header: 'XP To Next Rank'},
    ];

    const skillSources: SkillSource[] = user.SkillSources;

    user.TotalSkills = this.objectToMap(user.TotalSkills)
    for (let i = 0; i < user.SkillSources.length; i++) {
      user.SkillSources[i] = {
        Name: user.SkillSources[i].Name,
        Skills: this.objectToMap(user.SkillSources[i].Skills)
      }
    }

    for (const skillSource of skillSources) {
      columns.push({ field: skillSource.Name, header: skillSource.Name });
    }

    const skills: Skill[] = [];
    const totalSkillSources: Map<string, number> = new Map();

    for (const [skill, level] of user.TotalSkills) {
      const skillSourcesAmount: Map<string, number> = new Map();
      for (const source of skillSources) {
        const sourceLevel = source.Skills.get(skill) ?? 0;
        skillSourcesAmount.set(source.Name, sourceLevel);
        if (totalSkillSources.has(source.Name)) {
          totalSkillSources.set(source.Name, totalSkillSources.get(source.Name)! + sourceLevel);
        } else {
          totalSkillSources.set(source.Name, sourceLevel);
        }
      }

      const rankInfo = getRankInfoFromXP(level)
      skills.push({
        name: skill,
        skillSourcesAmount: skillSourcesAmount,
        rankInfo: rankInfo
      });
    }

    return [columns, skills];
  }

  objectToMap(obj: Record<string, any>): Map<string, number> {
    const map = new Map<string, number>();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        map.set(key, obj[key]);
      }
    }

    return map;
  }
}
