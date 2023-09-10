import { Injectable } from '@angular/core';
import {Job} from "../model/job";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = 'http://localhost:7000/jobs';

  constructor(private http: HttpClient) { }

  async createJob(job: any): Promise<Job> {
    return await this.http.post<Job>(`${this.baseUrl}`, job).toPromise() ?? {} as Job;
  }

  async getJobById(id: string): Promise<any> {
    return await this.http.get(`${this.baseUrl}/${id}`).toPromise();
  }

  async updateJob(id: string, job: Job): Promise<Job> {
    return await this.http.put<Job>(`${this.baseUrl}/${name}`, job).toPromise() ?? {} as Job;
  }

  async deleteJob(name: string): Promise<Job | undefined> {
    return await this.http.delete<Job>(`${this.baseUrl}/${name}`).toPromise();
  }

  async getAllJobs(): Promise<Job[]> {
    return (await this.http.get<Job[]>(`${this.baseUrl}`).toPromise()) ?? [];
  }


  async searchJob(model: Job): Promise<Job[]> {
    const params = new HttpParams()
        .set("location", model.Location)
        .set("company", model.Company)
        .set("description", model.Description)
        .set("salary", model.Salary)
        .set("title", model.Title)

    const jsonPayload = model.Requirements

    return (await this.http.post<Job[]>(`${this.baseUrl}/search`, jsonPayload, { params }).toPromise()) ?? [];
  }
}
