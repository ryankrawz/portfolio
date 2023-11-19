import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadConfigService } from '../services/load-config.service';
import { AppSections } from '../shared/enums/AppSections';

interface Job {
  start: string;
  end: string;
  role: string;
  company: string;
  description: string;
  experiences?: string[];
  image: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent implements OnInit {
  // List of jobs with time, description, role, etc.
  private _jobs: Job[] = [];

  // Track job currently being viewed in order to
  // correctly display job info and paging chevrons.
  currentJobIdx: number = 0;
  maxJobIdx: number = 0;
  currentJob: Job | null = null;

  constructor(
    private loadConfigService: LoadConfigService,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.WORK).subscribe(introObj => {
      this._jobs = introObj['jobs'];
      if (this._jobs.length > 0) {
        this.maxJobIdx = this._jobs.length - 1;
        this.currentJob = this._jobs[this.currentJobIdx];
      }
    });
  }

  /*
  * EVENT HANDLERS
  */

  onPageLeft() {
    if (this.currentJobIdx > 0) {
      this.currentJobIdx--;
      this.currentJob = this._jobs[this.currentJobIdx];
    }
  }

  onPageRight() {
    if (this.currentJobIdx < this.maxJobIdx) {
      this.currentJobIdx++;
      this.currentJob = this._jobs[this.currentJobIdx];
    }
  }

}
