import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroComponent } from '../intro/intro.component';
import { WorkComponent } from '../work/work.component';
import { ProjectsAndCertsComponent } from '../projects-and-certs/projects-and-certs.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    WorkComponent,
    ProjectsAndCertsComponent,
    ContactComponent,
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss'
})
export class BaseComponent {
  // Flag for signaling whether or not viewer has scrolled 100vh past the intro section.
  // Once this occurs, nav bar should become fixed and profile photo/name should appear.
  scrolledPastIntro: boolean = false;

  // Listen to scroll and wait for viewer to pass through intro section
  @HostListener('window:scroll')
  onWindowScroll() {
    // TODO: window.scrollY ?
    console.log(window);
  }
}
