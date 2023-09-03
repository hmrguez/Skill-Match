package Helper

import "fmt"

func GenerateEmailTemplate(Username, Name, Issuer, IssueDate string, Skills []string) string {
	template := `
	Hello %s,

	You have requested to validate a certificate with the following details:
	Certificate Name: %s
	Issued by: %s
	Issue Date: %s
	Skills: %s

	Please find the attached certificate file for validation.

	Best regards,
	Your Application
	`

	// Join the skills array into a comma-separated string
	skillsString := ""
	if len(Skills) > 0 {
		skillsString = Skills[0]
		for i := 1; i < len(Skills); i++ {
			skillsString += ", " + Skills[i]
		}
	}

	return fmt.Sprintf(template, Username, Name, Issuer, IssueDate, skillsString)
}
