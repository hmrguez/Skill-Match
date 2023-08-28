import {SkillSource} from "./skillSource";

export interface User {
  name: string;
  skillSources: SkillSource[];
  totalSkills: Map<string, number>;
}

export function calculateTotalSkills(skillSources: SkillSource[]): Map<string, number> {
  const totalSkills = new Map<string, number>();
  for (const source of skillSources) {
    for (const [skill, level] of source.skills) {
      if (totalSkills.has(skill)) {
        totalSkills.set(skill, totalSkills.get(skill)! + level);
      } else {
        totalSkills.set(skill, level);
      }
    }
  }
  return totalSkills;
}
