package Helper

import (
	"SkillMatchBack/Data/Models"
)

func AddCertificationsSkillSource(u *Models.User) {
	// Create a new skill source for certifications.
	certSkills := make(map[string]int)

	// Iterate through the user's certifications and combine language stats.
	for _, cert := range u.Certifications {
		for lang, count := range cert.Skills {
			certSkills[lang] += count
		}
	}

	// Check if a "Certifications" skill source already exists.
	existingIndex := -1
	for i, source := range u.SkillSources {
		if source.Name == "Certifications" {
			existingIndex = i
			break
		}
	}

	// Replace the existing "Certifications" skill source or add it if it doesn't exist.
	if existingIndex != -1 {
		u.SkillSources[existingIndex] = Models.SkillSource{
			Name:   "Certifications",
			Skills: certSkills,
		}
	} else {
		// Create the new SkillSource for certifications.
		certSource := Models.SkillSource{
			Name:   "Certifications",
			Skills: certSkills,
		}

		// Append the new skill source to the user's SkillSources.
		u.SkillSources = append(u.SkillSources, certSource)
	}
}
