import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  cols: any;
  jobs: any;

  constructor() {
    this.cols = [
      {field: 'title', header: 'Title'},
      {field: 'description', header: 'Description'},
      {field: 'location', header: 'Location'},
      {field: 'salary', header: 'Salary'},
      {field: 'company', header: 'Company'},
    ]
  }

  ngOnInit(): void {

  }
}
