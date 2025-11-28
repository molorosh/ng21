import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutThisApp } from './about-this-app';

describe('AboutThisApp', () => {
  let component: AboutThisApp;
  let fixture: ComponentFixture<AboutThisApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutThisApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutThisApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
