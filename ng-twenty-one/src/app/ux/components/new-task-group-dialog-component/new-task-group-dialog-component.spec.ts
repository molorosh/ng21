import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskGroupDialogComponent } from './new-task-group-dialog-component';

describe('NewTaskGroupDialogComponent', () => {
  let component: NewTaskGroupDialogComponent;
  let fixture: ComponentFixture<NewTaskGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTaskGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTaskGroupDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
