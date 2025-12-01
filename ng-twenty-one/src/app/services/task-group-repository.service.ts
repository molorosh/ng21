import {Injectable, signal, inject } from '@angular/core';
import { TaskGroupRepository } from '../domain/task-group-repository.interface';
import { TaskGroup } from '../domain/task-group.class';
import { DataStore } from '../persistence/data-store.class';

@Injectable({providedIn: 'root'})
export class TaskGroupRepositoryService implements TaskGroupRepository {
    createdTime = signal<Date | null>(null);
    dataStore: DataStore = inject(DataStore);
    
    constructor() {
        this.createdTime.set(new Date());
        console.log('TaskGroupRepositoryService instantiated at', this.createdTime());
    }

    async add(entity: TaskGroup): Promise<number> {
        console.log('Adding entity', entity);
        let result = TaskGroup.validateForPersistence(entity, this, false);
        return Promise.resolve(123);
    }

    async fetchById(id: number): Promise<TaskGroup | null> {
        console.log('Getting entity by id', id);
        return Promise.resolve(null);
    }

    async getAll(): Promise<TaskGroup[]> {
        console.log('Getting all entities');
        return this.dataStore.getAllTaskGroups();
    }

    async save(entity: TaskGroup): Promise<void> {
        console.log('Saving entity', entity);
        return Promise.resolve();
    }
}