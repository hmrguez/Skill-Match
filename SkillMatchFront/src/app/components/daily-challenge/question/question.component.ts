import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MultipleChoiceQuestion} from "../../../model/multipleChoiceQuestion";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../model/user";
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question!: MultipleChoiceQuestion;
  @Input() user!: User;
  selectedChoices: string[] = [];
  showAnswer = false;
  isCorrect = false;

  constructor(private authService: AuthService, private userService: UserService, private messageService: MessageService, private router: Router) { }

  async submitAnswer() {
    this.isCorrect = this.selectedChoices.join(',') === this.question.Answer;
    this.showAnswer = true;

    if(this.isCorrect){
      let skill = this.question.Skill
      await this.userService.dailyChallengeCompleted(this.user.Name, skill).then(() => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Daily Challenge Completed!'});
      })

      await this.router.navigate([`/profile/${this.user.Name}`]);
    } else{
      this.user.DailyChallenge = true
      await this.userService.updateUser(this.user.Name, this.user)
      this.messageService.add({severity:'warn', summary: 'Wrong answer', detail: 'Your submitted answer to the daily challenge was incorrect'})
      await this.router.navigate([`/profile/${this.user.Name}`]);
    }

  }
}
