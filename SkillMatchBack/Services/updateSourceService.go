package Services

import (
	"SkillMatchBack/Data/Models"
	"SkillMatchBack/Helper"
	"context"
	"log"
)

type UpdateSourceService struct {
	userService UserService
}

func NewUpdateSourceService(userService UserService) *UpdateSourceService {
	return &UpdateSourceService{userService: userService}
}

func (s *UpdateSourceService) UpdateAllUsers(githubToken string) error {
	users, err := s.userService.GetAllUsers(context.Background())
	if err != nil {
		return err
	}

	for _, user := range users {
		err := s.UpdateSingleUser(user, githubToken)
		if err != nil {
			log.Printf("User %s couldn't be updated\n", user.Name)
		}
	}

	return nil
}

func (s *UpdateSourceService) UpdateSingleUser(user Models.User, githubToken string) error {
	if len(user.GithubProfile) > 0 {
		Helper.AttachGithubStatsToUser(&user, githubToken)
	}

	return s.userService.UpdateUser(context.Background(), user.Name, user)
}
