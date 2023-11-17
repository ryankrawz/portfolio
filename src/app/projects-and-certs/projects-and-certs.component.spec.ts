import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAndCertsComponent } from './projects-and-certs.component';

describe('ProjectsAndCertsComponent', () => {
  let component: ProjectsAndCertsComponent;
  let fixture: ComponentFixture<ProjectsAndCertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAndCertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsAndCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
