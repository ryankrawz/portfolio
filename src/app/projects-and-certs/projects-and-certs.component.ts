import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadConfigService } from '../services/load-config.service';
import { AppSections } from '../shared/enums/AppSections';
import { Project } from '../shared/interfaces/Project';
import { TileComponent } from './tile/tile.component';

@Component({
  selector: 'app-projects-and-certs',
  standalone: true,
  imports: [
    CommonModule,
    TileComponent,
  ],
  templateUrl: './projects-and-certs.component.html',
  styleUrl: './projects-and-certs.component.scss'
})
export class ProjectsAndCertsComponent implements OnInit {
  projects: Project[] = [];
  tagColors: { [key: string]: string } = {};

  constructor(
    private loadConfigService: LoadConfigService,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.PROJECTS_AND_CERTS).subscribe(projectObj => {
      this.projects = projectObj['projects'];
      this.tagColors = projectObj['tagColors'];
    });
  }

}
