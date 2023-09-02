import { Injectable } from '@angular/core';
import {Job} from "../model/job";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private baseUrl = 'http://localhost:7000/application';

  constructor(private http: HttpClient) { }

  async createApplication(application: any): Promise<void> {
    await this.http.post<any>(`${this.baseUrl}`, application).toPromise();
  }


  async deleteApplication(application: any): Promise<void> {
    console.log(application)
    await this.http.post<void>(`${this.baseUrl}/delete`, application).toPromise();
  }
}
