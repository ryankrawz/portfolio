import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadConfigService } from '../services/load-config.service';
import { AppSections } from '../shared/enums/AppSections';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {
  // Short description of myself and my value proposition
  about: string = '';

  constructor(
    private loadConfigService: LoadConfigService,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.INTRO).subscribe(introObj => {
      this.about = introObj['about'];
    });
  }

}
