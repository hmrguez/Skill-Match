export enum Rank {
  Novice = 'Novice',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Proficient = 'Proficient',
  Advanced = 'Advanced',
  Expert = 'Expert',
  Master = 'Master',
  Grandmaster = 'Grandmaster',
}

const rankOrder: Rank[] = [
  Rank.Novice,
  Rank.Beginner,
  Rank.Intermediate,
  Rank.Proficient,
  Rank.Advanced,
  Rank.Expert,
  Rank.Master,
  Rank.Grandmaster,
];

export interface RankInfo {
  currentRank: Rank;
  xpExcess: number;
  xpNeededForNextRank: number;
}

const rankXpMap: Map<Rank, number> = new Map([
  [Rank.Novice, 0],
  [Rank.Beginner, 100],
  [Rank.Intermediate, 300],
  [Rank.Proficient, 600],
  [Rank.Advanced, 1000],
  [Rank.Expert, 1500],
  [Rank.Master, 2100],
  [Rank.Grandmaster, 2800],
]);

export function getRankInfoFromXP(xp: number): RankInfo {
  let currentRank: Rank = Rank.Novice;
  let xpExcess = 0;
  let xpNeededForNextRank = 0;

  for (const [rank, requiredXP] of rankXpMap.entries()) {
    if (xp >= requiredXP) {
      currentRank = rank;
    } else {
      xpExcess = xp - rankXpMap.get(currentRank)!;

      if (currentRank !== Rank.Novice) {
        const prevRankIndex = rankOrder.indexOf(currentRank) - 1;
        const prevRank = rankOrder[prevRankIndex];
        xpNeededForNextRank = requiredXP - rankXpMap.get(prevRank)!;
      } else {
        xpNeededForNextRank = requiredXP;
      }

      break;
    }
  }

  return {
    currentRank,
    xpExcess,
    xpNeededForNextRank,
  };
}
