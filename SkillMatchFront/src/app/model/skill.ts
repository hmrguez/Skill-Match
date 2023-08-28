import {RankInfo} from "../data/rank";

export interface Skill{
  name: string
  skillSourcesAmount: Map<string, number>
  rankInfo: RankInfo,
}
