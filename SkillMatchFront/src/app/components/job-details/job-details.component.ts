import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access the 'id' parameter from the route
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      console.log('Job ID:', productId);
    });
  }
}
