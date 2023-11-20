import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Project } from '../../shared/interfaces/Project';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent implements OnInit {
  // Project URLs must be sanitized before used as href
  safeUrl: SafeUrl | undefined;

  @Input({ required: true }) project: Project | undefined;
  @Input({ required: true }) tagColors: { [key: string]: string } | undefined;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (this.project) {
      this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.project.link);
    }
  }
}
