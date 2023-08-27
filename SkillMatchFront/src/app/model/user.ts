import {SkillSource} from "./skillSource";

export interface User {
  name: string;
  skillSources: SkillSource[];
  totalSkills: Map<string, number>;
}

// Cycles through user.skillSources adding skill values up
export function MapTotalSkillsInUser(user: User): void {
  let map = new Map<string, number>();
  for(const skillSource of user.skillSources){
    for (const skill of skillSource.skills) {
      if(map.has(skill[0])){
        const newValue = map.get(skill[0])! + skill[1]
        map.set(skill[0], newValue)
      } else {
        map.set(skill[0], skill[1])
      }
    }
  }
}
