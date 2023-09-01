import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";

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
}
