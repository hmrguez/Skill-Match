package Helper

import (
	"SkillMatchBack/Data/Models"
)

func CalculateTotalSkills(skillSources []Models.SkillSource) map[string]int {
	totalSkills := make(map[string]int)

	for _, source := range skillSources {
		for skill, level := range source.Skills {
			if val, exists := totalSkills[skill]; exists {
				totalSkills[skill] = val + level
			} else {
				totalSkills[skill] = level
			}
		}
	}

	return totalSkills
}
