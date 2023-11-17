import { Component } from '@angular/core';
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

}
