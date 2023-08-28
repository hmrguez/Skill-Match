import { Injectable } from '@angular/core';
import {calculateTotalSkills, User} from "../model/user";
import {SkillSource} from "../model/skillSource";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers(){
    const skillSource1: SkillSource = {
      name: "Source 1",
      skills: new Map([
        ["SkillA", 5],
        ["SkillB", 8],
        ["SkillC", 3]
      ])
    };

    const skillSource2: SkillSource = {
      name: "Source 2",
      skills: new Map([
        ["SkillB", 4],
        ["SkillD", 6],
        ["SkillE", 7]
      ])
    };

    const skillSource3: SkillSource = {
      name: "Source 3",
      skills: new Map([
        ["SkillA", 2],
        ["SkillC", 9],
        ["SkillF", 4]
      ])
    };

    const skillSource4: SkillSource = {
      name: "Source 4",
      skills: new Map([
        ["SkillD", 109],
        ["SkillE", 568],
        ["SkillG", 1022]
      ])
    };

    // Creating a User instance with the SkillSources
    const user: User = {
      name: "John Doe",
      skillSources: [skillSource1, skillSource2, skillSource3, skillSource4],
      totalSkills: calculateTotalSkills([skillSource1, skillSource2, skillSource3, skillSource4])
    };

    return [user];
  }
}
