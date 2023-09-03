import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private baseUrl = 'http://localhost:7000/certifications'; // Replace with y6our Go server URL

  constructor(private http: HttpClient) { }

  uploadCertification(data: { Name: string, IssueDate: string, Issuer: string, Skills: string[] }, file: File, username: string): Promise<any> {
    // Create query parameters for the strings and string array
    let params = new HttpParams()
      .set('Name', data.Name)
      .set('IssueDate', data.IssueDate)
      .set('Issuer', data.Issuer)


    console.log(data.Skills)
    // Append the string array elements to the query parameters
    data.Skills.forEach((item: any, index: number) => {
      params = params.append(`Skills`, item);
    });

    // Create FormData for the file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Send a POST request with query parameters and FormData
    return this.http.post<any>(`${this.baseUrl}/upload/${username}`, formData, { params }).toPromise();
  }
}
