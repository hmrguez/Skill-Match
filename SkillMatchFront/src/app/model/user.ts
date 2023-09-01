import {SkillSource} from "./skillSource";

export interface Repo {
  Name: string;
  Description: string
  Url: string
  LanguageStats: Map<string, number>;
}

export interface User {
  Name: string;
  GithubProfile: string
  GithubRepos: Repo[]
  SkillSources: SkillSource[];
  TotalSkills: Map<string, number>;
}

export function calculateTotalSkills(skillSources: SkillSource[]): Map<string, number> {
  const totalSkills = new Map<string, number>();
  for (const source of skillSources) {
    for (const [skill, level] of source.Skills) {
      if (totalSkills.has(skill)) {
        totalSkills.set(skill, totalSkills.get(skill)! + level);
      } else {
        totalSkills.set(skill, level);
      }
    }
  }
  return totalSkills;
}
