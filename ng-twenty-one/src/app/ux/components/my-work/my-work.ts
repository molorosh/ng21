import { Component, inject, signal, OnInit, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { TaskGroupRepository } from '../../../domain/task-group-repository.interface';
import { TaskGroupRepositoryService } from '../../../services/task-group-repository.service';
import { TaskGroup } from '../../../domain/task-group.class';
import { EntityStatus } from '../../../ddd/entity-status.enum';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NewTaskGroupDialogComponent } from '../new-task-group-dialog-component/new-task-group-dialog-component';

@Component({
  selector: 'app-my-work',
  imports: [ MatButtonModule ],
  templateUrl: './my-work.html',
  styleUrl: './my-work.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWork implements OnInit {
  // I'm still using the interface here - but supplying the concrete implementation via inject/DI
  repo : TaskGroupRepository = inject(TaskGroupRepositoryService)
  readonly dialog = inject(MatDialog);
  thePk = signal(-21);
  theTitle = signal('Group A');

  constructor(){
    console.log("CTOR this.repo.isAwake()", this.repo.isAwake());
    // perhaps if the awake props were signals I could receive an update when it goes from
    // false to true?
  }

  // the list of task groups
  theGroups = signal<TaskGroup[]>([]);

  public openDialog(): void {
    let dialogRef = this.dialog.open(NewTaskGroupDialogComponent, {
      height: '400px',
      width: '600px',
    });
  }

  public create(): void {
    console.log(" create clicked ");
    let tg: TaskGroup = new TaskGroup(-1, EntityStatus.Created, this.theTitle());
    this.repo.add(tg).then(opSum => {
      console.log("opSum", opSum);
    });
  }

  public getAll(): void {
    console.log(" getAll() ");
    console.log(" this.repo.isAwake()", this.repo.isAwake());
    this.repo.getAll().then(i => this.theGroups.set(i));
    console.log(" this.repo.isAwake()", this.repo.isAwake());
  }

  ngOnInit(){
    console.log(" ngOnInit() ");
    console.log(" this.repo.isAwake()", this.repo.isAwake());
  }
}
