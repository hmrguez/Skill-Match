import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-daily-challenge',
  templateUrl: './daily-challenge.component.html',
  styleUrls: ['./daily-challenge.component.scss']
})
export class DailyChallengeComponent implements OnInit{

  threeRandomSkills: any[] = []
  question: any;
  user: User = {} as User;

  constructor(private questionService: QuestionService, private authService: AuthService, private userService: UserService){
  }

  async ngOnInit() {
    this.user = await this.userService.getUserByName(this.authService.getUsername());
    this.threeRandomSkills = ["Java", "Python", "C++"]
  }

  async openQuestion(skill: string) {
    const filter = {
      skill: skill
    }

    const availableQuestions = await this.questionService.searchQuestions(filter)
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    this.question = availableQuestions[randomIndex];
  }
}
