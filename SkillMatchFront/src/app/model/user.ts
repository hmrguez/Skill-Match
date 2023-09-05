import {SkillSource} from "./skillSource";
import {Certification} from "./certification";

export interface Repo {
  Name: string;
  Description: string
  Url: string
  LanguageStats: Map<string, number>;
}

export interface WorkExperience {
  Title: string
  Company: string
  Description: string
  StartDate: string
  EndDate: string
}

export interface User {
  Name: string;
  GithubProfile: string
  GithubRepos: Repo[]
  Certifications: Certification[]
  SkillSources: SkillSource[];
  TotalSkills: Map<string, number>;
  JobsAppliedIds: string[]
  WorkExperiences: WorkExperience[]
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
