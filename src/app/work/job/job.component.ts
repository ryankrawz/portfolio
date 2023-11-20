import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../shared/interfaces/Job';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit {
  @Input({ required: true }) job: Job | undefined;

  jobBackground: string = '';

  ngOnInit(): void {
    if (this.job) {
      this.jobBackground = `linear-gradient(to bottom, rgba(0, 0, 0, 30%), black), url('${this.job.image}')`;
    }
  }
}
