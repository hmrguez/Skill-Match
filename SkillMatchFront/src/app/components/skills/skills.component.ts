import {Component, OnInit} from '@angular/core';
import {Skill} from "../../model/skill";
import {User} from "../../model/user";
import {SkillSource} from "../../model/skillSource";
import {UserService} from "../../services/user.service";
import {getRankInfoFromXP} from "../../data/rank";

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
  user!: User
  headerArray: Column[] = [];
  skillArray: Skill[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUsers()[0]
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

    const skillSources: SkillSource[] = user.skillSources;

    for (const source of skillSources) {
      columns.push({ field: source.name, header: source.name });
    }

    const skills: Skill[] = [];
    const totalSkillSources: Map<string, number> = new Map();

    for (const [skill, level] of user.totalSkills) {
      const skillSourcesAmount: Map<string, number> = new Map();
      for (const source of skillSources) {
        const sourceLevel = source.skills.get(skill) || 0;
        skillSourcesAmount.set(source.name, sourceLevel);
        if (totalSkillSources.has(source.name)) {
          totalSkillSources.set(source.name, totalSkillSources.get(source.name)! + sourceLevel);
        } else {
          totalSkillSources.set(source.name, sourceLevel);
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
}
