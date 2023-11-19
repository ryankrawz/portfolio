import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

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
export class BaseComponent implements OnInit {
  // Depending on how far user scrolls past intro section, fixed nav bar will be assigned
  // different opacities and slowly fade in.
  navBarOpacityClass: string = '';

  // Caching height between nav bar and bottom of window.
  // Bottom of window is valid because intro section is 100vh (default to 920px).
  private _navBarToBottomWindow: number = 920;
  // Thresholds for transitioning to higher opacity
  private _navBarOpacityIntervals: number[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    const navBarElement = this.document.getElementById('page-nav');
    if (navBarElement && this.document.defaultView) {
      this._navBarToBottomWindow = this.document.defaultView.innerHeight - navBarElement.offsetHeight;
      // Add opacity thresholds at increments of 10% of nav bar height
      for (let i = 1; i <= 10; i++) {
        this._navBarOpacityIntervals.push(this._navBarToBottomWindow + (navBarElement.offsetHeight * 0.1 * i));
      }
    }
  }

  // Listen to scroll and wait for viewer to pass through intro section
  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.document.defaultView) {
      const amountScrolled = this.document.defaultView.scrollY;
      if (amountScrolled >= this._navBarToBottomWindow) {
        // Determine which 10% interval past intro section user has scrolled to.
        // CSS class with proportionate amount of opacity will be applied.
        let opacityLevel = 1;
        for (let interval of this._navBarOpacityIntervals) {
          if (amountScrolled < interval) {
            this.navBarOpacityClass = `nav-bar-opacity-${opacityLevel}`;
            return;
          }
          opacityLevel++;
        }
        // If this point has been reached, the scroll event was too fast for the
        // gradual interval changes to be detected. Viewer has already left intro
        // section and nav bar should be given full opacity.
        this.navBarOpacityClass = 'nav-bar-opacity-10';
      } else {
        this.navBarOpacityClass = '';
      }
    }
  }
}
