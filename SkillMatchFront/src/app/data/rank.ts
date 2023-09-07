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

export const rankOrder: Rank[] = [
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

export const rankXpMap: Map<Rank, number> = new Map([
  [Rank.Novice, 0],
  [Rank.Beginner, 500],
  [Rank.Intermediate, 1500],
  [Rank.Proficient, 3000],
  [Rank.Advanced, 5000],
  [Rank.Expert, 8000],
  [Rank.Master, 12000],
  [Rank.Grandmaster, 20000],
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

export function findXpForRanks(rankName1: string, rankName2: string): [number, number] {
  const rank1 = Rank[rankName1 as keyof typeof Rank];
  const rank2 = Rank[rankName2 as keyof typeof Rank];

  if (rank1 === undefined || rank2 === undefined) {
    throw new Error('Invalid rank name');
  }

  const rank1Index = rankOrder.indexOf(rank1);
  const rank2Index = rankOrder.indexOf(rank2);

  if (rank1Index === -1 || rank2Index === -1) {
    throw new Error('Rank not found in the order');
  }

  const xp1 = rankXpMap.get(rank1) || 0;
  const xp2 = rankXpMap.get(rank2) || 0;

  if (rank1Index <= rank2Index) {
    const xpNeededForNextRank = rank1Index <= rank2Index ? xp2 : -1;
    return [xp1, xpNeededForNextRank];
  } else {
    return [xp1, -1]; // Grandmaster reached, no next rank
  }
}

export function getSkillRanks(skillMap: Map<string, number>): [string, number, Rank][] {
  // Step 1: Convert the input Map to an array of [string, number] pairs
  const skillArray: [string, number][] = [];
  for (const skillArrayElement of skillMap) {
    skillArray.push([skillArrayElement[0], skillArrayElement[1]])
  }

  // Step 2: Sort the array by XP in descending order
  skillArray.sort((a, b) => b[1] - a[1]);

  // Step 3 and 4: Calculate Rank information for each skill and create the result array
  return skillArray.map(([skill, xp]) => {
    const rankInfo = getRankInfoFromXP(xp);
    return [skill, xp, rankInfo.currentRank];
  });
}
