import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSections } from '../shared/enums/AppSections';

@Injectable({
  providedIn: 'root'
})
export class LoadConfigService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  // Locates and returns an Observable for the JSON config
  // in static assets that corresponds to the requested section.
  getConfigForSection(sectionName: AppSections): Observable<any> {
    return this.httpClient.get(`../assets/config/${sectionName}.json`);
  }
}
