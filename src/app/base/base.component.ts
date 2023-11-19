import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { Subscription, fromEvent, tap, throttleTime } from 'rxjs';

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
export class BaseComponent implements OnInit, OnDestroy {
  // Depending on how far user scrolls past intro section, fixed nav bar will be assigned
  // different opacities and slowly fade in.
  navBarOpacityClass: string = '';

  // Caching height of window and height between nav bar and bottom of window.
  // Bottom of window is valid because intro section is 100vh (default to 1000/920px).
  private _windowHeight: number = 1000;
  private _navBarToBottomWindow: number = 920;
  // Thresholds for transitioning to higher opacity
  private _navBarOpacityIntervals: number[] = [];
  // Subscription to window resize events so that opacity intervals can be adjusted to
  // new size of window. RXJS preferred over @HostListener since it supports throttling.
  private _windowResizeSub: Subscription | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
    this._updateNavBarOpacityIntervals();
    if (this.document.defaultView) {
      this._windowResizeSub = fromEvent(this.document.defaultView, 'resize').pipe(
        // Throttle rate of 250 ms
        throttleTime(250),
        tap(_ => this._updateNavBarOpacityIntervals()),
      ).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this._windowResizeSub) {
      this._windowResizeSub.unsubscribe();
    }
  }

  // Listen to scroll and wait for viewer to pass through intro section
  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.document.defaultView) {
      const amountScrolled = this.document.defaultView.scrollY;
      // Viewer is still in intro section
      if (amountScrolled < this._navBarToBottomWindow) {
        this.navBarOpacityClass = '';
      // Viewer has already left intro section and nav bar should be given full opacity
      } else if (amountScrolled >= this._windowHeight) {
        this.navBarOpacityClass = 'nav-bar-opacity-10';
      // Determine which 10% interval past intro section user has scrolled to.
      // CSS class with proportionate amount of opacity will be applied.
      } else {
        let opacityLevel = 1;
        for (let interval of this._navBarOpacityIntervals) {
          if (amountScrolled < interval) {
            this.navBarOpacityClass = `nav-bar-opacity-${opacityLevel}`;
            break;
          }
          opacityLevel++;
        }
      }
    }
  }

  private _updateNavBarOpacityIntervals() {
    const navBarElement = this.document.getElementById('page-nav');
    if (navBarElement && this.document.defaultView) {
      this._windowHeight = this.document.defaultView.innerHeight;
      this._navBarToBottomWindow = this._windowHeight - navBarElement.offsetHeight;
      this._navBarOpacityIntervals = [];
      // Add opacity thresholds at increments of 10% of nav bar height
      for (let i = 1; i <= 10; i++) {
        this._navBarOpacityIntervals.push(this._navBarToBottomWindow + (navBarElement.offsetHeight * 0.1 * i));
      }
    }
  }
}
