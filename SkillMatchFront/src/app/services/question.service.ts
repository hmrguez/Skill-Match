import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MultipleChoiceQuestion} from "../model/multipleChoiceQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'http://localhost:7000/question'; // Change the URL to the endpoint for questions

  constructor(private http: HttpClient) { }

  async createQuestion(question: MultipleChoiceQuestion): Promise<MultipleChoiceQuestion> {
    return await this.http.post<MultipleChoiceQuestion>(`${this.baseUrl}`, question).toPromise() ?? {} as MultipleChoiceQuestion;
  }

  async getQuestionById(id: string): Promise<MultipleChoiceQuestion> {
    return await this.http.get<MultipleChoiceQuestion>(`${this.baseUrl}/${id}`).toPromise() ?? {} as MultipleChoiceQuestion;
  }

  async updateQuestion(id: string, question: MultipleChoiceQuestion): Promise<MultipleChoiceQuestion> {
    return await this.http.put<MultipleChoiceQuestion>(`${this.baseUrl}/${id}`, question).toPromise() ?? {} as MultipleChoiceQuestion;
  }

  async deleteQuestion(id: string): Promise<MultipleChoiceQuestion | undefined> {
    return await this.http.delete<MultipleChoiceQuestion>(`${this.baseUrl}/${id}`).toPromise();
  }

  async getAllQuestions(): Promise<MultipleChoiceQuestion[]> {
    return (await this.http.get<MultipleChoiceQuestion[]>(`${this.baseUrl}`).toPromise()) ?? [];
  }

  async searchQuestions(filter: any): Promise<MultipleChoiceQuestion[]> {
    return (await this.http.post<MultipleChoiceQuestion[]>(`${this.baseUrl}/search`, filter).toPromise()) ?? [];
  }
}
