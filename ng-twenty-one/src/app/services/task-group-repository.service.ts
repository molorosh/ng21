import { Injectable, signal, inject } from '@angular/core';
import { TaskGroupRepository } from '../domain/task-group-repository.interface';
import { TaskGroup } from '../domain/task-group.class';
import { DataStore } from '../persistence/data-store.class';
import { OperationSummary } from '../ddd/operation-summary.class';

@Injectable({providedIn: 'root'})
export class TaskGroupRepositoryService implements TaskGroupRepository {
    createdTime = signal<Date | null>(null);
    dataStore: DataStore = inject(DataStore);
    
    constructor() {
        this.createdTime.set(new Date());
        console.log('TaskGroupRepositoryService instantiated at', this.createdTime());
    }

    async add(entity: TaskGroup): Promise<OperationSummary> {
        console.log('Adding entity', entity);
        try {
            const os = await TaskGroup.validateForPersistence(entity, this, false);
            // handle system error or validation summary consistently
            if (os.result.resultType === "SystemError") {
                return os;
            }
            if (os.result.resultType === "ValidationSummary") {
                if (os.result.messages.length === 0) {
                    // no validation messages -> persist and return the success summary
                    await this.dataStore.persistTaskGroup(entity);
                    return os;
                } else {
                    // validation messages present -> return the validation summary
                    return os;
                }
            }
            // fallback - return a generic error summary
            return OperationSummary.CreateAsError();
        } catch (err) {
            // validation threw or something else failed
            return OperationSummary.CreateAsError();
        }
    }

    async fetchById(id: number): Promise<TaskGroup | null> {
        console.log('Getting entity by id', id);
        return Promise.resolve(null);
    }

    async getAll(): Promise<TaskGroup[]> {
        console.log('Getting all entities');
        console.log("this.dataStore:", this.dataStore);
        return this.dataStore.getAllTaskGroups();
    }

    async save(entity: TaskGroup): Promise<OperationSummary> {
        console.log('Adding entity', entity);
        return TaskGroup.validateForPersistence(entity, this, false);
    }

    isAwake(): boolean {
        return this.dataStore.isAwakened();    
    }

}