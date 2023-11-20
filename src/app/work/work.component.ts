import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadConfigService } from '../services/load-config.service';
import { AppSections } from '../shared/enums/AppSections';
import { JobComponent } from './job/job.component';
import { Job } from '../shared/interfaces/Job';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    CommonModule,
    JobComponent,
  ],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  // Track job currently being viewed in order to
  // correctly display job info and paging chevrons.
  jobs: Job[] = [];
  currentJobIdx: number = 0;
  maxJobIdx: number = 0;
  slideAmount: number = 0;

  constructor(
    private loadConfigService: LoadConfigService,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.WORK).subscribe(workObj => {
      this.jobs = workObj['jobs'];
      if (this.jobs.length > 0) {
        this.maxJobIdx = this.jobs.length - 1;
      }
    });
  }

  /*
  * EVENT HANDLERS
  */

  // To slide from left to right, move left margin to right by 100vw
  onPageLeft() {
    if (this.currentJobIdx > 0) {
      this.currentJobIdx--;
      this.slideAmount += 100;
    }
  }

  // To slide from right to left, move left margin to left by 100vw
  onPageRight() {
    if (this.currentJobIdx < this.maxJobIdx) {
      this.currentJobIdx++;
      this.slideAmount -= 100;
    }
  }

}
