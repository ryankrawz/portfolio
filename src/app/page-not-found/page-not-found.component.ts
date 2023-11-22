import { Component, OnInit, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {
  homeUrl: string | undefined;

  ngOnInit(): void {
      // Root URL is different depending on dev or prod mode
      this.homeUrl = isDevMode() ? '/' : '/portfolio';
  }

}
