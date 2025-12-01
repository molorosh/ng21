import { Component, inject, signal } from '@angular/core';
import { TaskGroupRepository } from '../../../domain/task-group-repository.interface';
import { TaskGroupRepositoryService } from '../../../services/task-group-repository.service';
import { TaskGroup } from '../../../domain/task-group.class';
import { EntityStatus } from '../../../ddd/entity-status.enum';

@Component({
  selector: 'app-my-work',
  imports: [],
  templateUrl: './my-work.html',
  styleUrl: './my-work.less',
})
export class MyWork {
  // I'm still using the interface here - but supplying the concrete implementation via inject/DI
  repo : TaskGroupRepository = inject(TaskGroupRepositoryService)
  thePk = signal(-21);
  theTitle = signal('Group A');

  public create(): void {
    console.log(" create clicked ");
    let tg: TaskGroup = new TaskGroup(-1, EntityStatus.Created, this.theTitle());
    this.repo.add(tg);
  }

  public getAll(): void {
    console.log(" getAll clicked ");
    this.repo.getAll().then(i => console.log("items", i));
  }
}
