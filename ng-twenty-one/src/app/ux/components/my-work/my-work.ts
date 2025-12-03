import { Component, inject, signal, OnInit, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { TaskGroupRepository } from '../../../domain/task-group-repository.interface';
import { TaskGroupRepositoryService } from '../../../services/task-group-repository.service';
import { TaskGroup } from '../../../domain/task-group.class';
import { EntityStatus } from '../../../ddd/entity-status.enum';

@Component({
  selector: 'app-my-work',
  imports: [],
  templateUrl: './my-work.html',
  styleUrl: './my-work.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyWork implements OnInit {
  // I'm still using the interface here - but supplying the concrete implementation via inject/DI
  repo : TaskGroupRepository = inject(TaskGroupRepositoryService)
  thePk = signal(-21);
  theTitle = signal('Group A');

  // the list of task groups
  theGroups = signal<TaskGroup[]>([]);

  public create(): void {
    console.log(" create clicked ");
    let tg: TaskGroup = new TaskGroup(-1, EntityStatus.Created, this.theTitle());
    this.repo.add(tg).then(opSum => {
      console.log("opSum", opSum);
    });
  }

  public getAll(): void {
    console.log(" getAll() ");
    this.repo.getAll().then(i => this.theGroups.set(i));
  }

  ngOnInit(){
    console.log(" ngOnInit() ");
    this.repo.getAll().then(i => this.theGroups.set(i));
  }
}
