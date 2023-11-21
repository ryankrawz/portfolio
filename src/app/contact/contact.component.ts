import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { LoadConfigService } from '../services/load-config.service';
import { AppSections } from '../shared/enums/AppSections';

interface Link {
  icon: string;
  url: SafeUrl;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  message: string = '';
  links: Link[] | undefined;

  constructor(
    private loadConfigService: LoadConfigService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.loadConfigService.getConfigForSection(AppSections.CONTACT).subscribe(contactObj => {
      this.message = contactObj['message'];
      const cleanLinks: Link[] = [];
      for (let link of contactObj['links']) {
        cleanLinks.push({
          icon: link['icon'],
          url: this.sanitizer.bypassSecurityTrustUrl(link['url']),
        });
      }
      this.links = cleanLinks;
    });
  }

}
