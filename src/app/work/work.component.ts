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
  currentJobIdx: number | undefined;
  maxJobIdx: number = 0;
  slideAmount: number | undefined;
  // Flag to help determine when margin transition should be applied
  // so that timeline doesn't slide into place when rendering.
  timelineReady: boolean = false;

  constructor(
    private loadConfigService: LoadConfigService,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.WORK).subscribe(workObj => {
      this.jobs = workObj['jobs'];
      if (this.jobs.length > 0) {
        this.maxJobIdx = this.jobs.length - 1;
        // Begin with most recent experience at end of timeline.
        // User begins viewing timeline by paging left to go back in time.
        this.currentJobIdx = this.maxJobIdx;
        this.slideAmount = -100 * this.currentJobIdx;
      }
      this.timelineReady = true;
    });
  }

  /*
  * EVENT HANDLERS
  */

  // To slide from left to right, move left margin to right by 100vw
  onPageLeft() {
    if (this.currentJobIdx !== undefined && this.slideAmount !== undefined && this.currentJobIdx > 0) {
      this.currentJobIdx--;
      this.slideAmount += 100;
    }
  }

  // To slide from right to left, move left margin to left by 100vw
  onPageRight() {
    if (this.currentJobIdx !== undefined && this.slideAmount !== undefined && this.currentJobIdx < this.maxJobIdx) {
      this.currentJobIdx++;
      this.slideAmount -= 100;
    }
  }

}
