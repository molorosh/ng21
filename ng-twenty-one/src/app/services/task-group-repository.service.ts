import {Injectable, signal} from '@angular/core';
import { TaskGroupRepository } from '../domain/task-group-repository.interface';

@Injectable({providedIn: 'root'})
export class TaskGroupRepositoryService implements TaskGroupRepository {
    createdTime = signal<Date | null>(null);
    
    constructor() {
        this.createdTime.set(new Date());
        console.log('TaskGroupRepositoryService instantiated at', this.createdTime());
    }

    async add(entity: any): Promise<number> {
        console.log('Adding entity', entity);
        return Promise.resolve(1);
    }

    async fetchById(id: number): Promise<any | null> {
        console.log('Getting entity by id', id);
        return Promise.resolve(null);
    }

    async getAll(): Promise<any[]> {
        console.log('Getting all entities');
        return Promise.resolve([]);
    }

    async save(entity: any): Promise<void> {
        console.log('Saving entity', entity);
        return Promise.resolve();
    }
}