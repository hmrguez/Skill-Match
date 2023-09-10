import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Skill} from "../model/skill";
import {Job, Requirement} from "../model/job";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:7000/users'; // Replace with y6our Go server URL

  constructor(private http: HttpClient) { }

  async createUser(user: any): Promise<User> {
    return await this.http.post<User>(`${this.baseUrl}`, user).toPromise() ?? {} as User;
  }

  async getUserByName(name: string): Promise<any> {
    return await this.http.get(`${this.baseUrl}/${name}`).toPromise();
  }

  async updateUser(name: string, user: User): Promise<User> {
    console.log(user)
    return await this.http.put<User>(`${this.baseUrl}/${name}`, user).toPromise() ?? {} as User;
  }

  async deleteUser(name: string): Promise<User | undefined> {
    return await this.http.delete<User>(`${this.baseUrl}/${name}`).toPromise();
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.http.get<User[]>(`${this.baseUrl}`).toPromise()) ?? [];
  }

  userMeetsSkillRequirements(user: User, requirements: Requirement[]): boolean {
    let userSkills = user.TotalSkills;
    let meetsRequirements = true;
    for (let requirement of requirements) {
      let found = false;
      try {
        for (let userSkill of userSkills) {
          if (userSkill[0] === requirement.Skill && userSkill[1] >= requirement.Min && userSkill[1] <= requirement.Max) {
            found = true;
            break;
          }
        }
        if (!found) {
          meetsRequirements = false;
          break;
        }
      } catch (e) {
        return false
      }

    }
    return meetsRequirements;
  }

  async dailyChallengeCompleted(username: string, skill: string): Promise<any> {
    let params = new HttpParams()
      .set('username', username)
      .set('skill', skill)

    return await this.http.put(`${this.baseUrl}/daily-challenge`, params, { params }).toPromise();
  }

  async sponsorUser(sponsorName: string, sponsoredName: string): Promise<any> {
    let params = new HttpParams()
        .set('sponsor', sponsorName)
        .set('sponsored', sponsoredName)

    return await this.http.put(`${this.baseUrl}/sponsor`, params, { params }).toPromise();
  }
}
