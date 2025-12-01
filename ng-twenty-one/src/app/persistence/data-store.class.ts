import { inject, Injectable } from "@angular/core";
import { DataStoreConfig } from "./data-store-config.service";
// it's absoutely fine for the database layer to know about the domain models - just not the other way around!
import { TaskGroup } from "../domain/task-group.class";
import { EntityStatus } from "../ddd/entity-status.enum";

@Injectable({providedIn: 'root'})
class DataStore {
    
    private idbIDBFactory: IDBFactory;
    private name: string;
    private dbVersion: number = 1;
    private dataStoreConfig = inject(DataStoreConfig);

    // keep a reference to the opened database
    private db?: IDBDatabase;

    constructor() {
        this.idbIDBFactory = window.indexedDB;
        this.name = this.dataStoreConfig.dbName;
        if(!this.idbIDBFactory) {
            // added to make tests pass in environments without IndexedDB
            // TODO: implement a mock IndexedDB for such environments
            return;
        }
        // this would normally be done in a request.onupgradeneeded = (event: IDBVersionChangeEvent) => { ... } handler
        var request: IDBOpenDBRequest = this.idbIDBFactory.open(this.name, this.dbVersion);
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            console.log('DataStore constructor onupgradeneeded opened IndexedDB');
            console.log('event: IDBVersionChangeEvent', event);
            let db: IDBDatabase = request.result;
            // so this means that the database did not exist before, or the version number was increased
            // we need to create the object stores
            let taskGroupStore: IDBObjectStore = db.createObjectStore(
                "task-groups", 
                { 
                    keyPath: "pk",
                    autoIncrement: true,
                }
            );
            taskGroupStore.createIndex("title", "title", { unique: false });
            let taskStore: IDBObjectStore = db.createObjectStore(
                "tasks", 
                { 
                    keyPath: "pk",
                    autoIncrement: true,
                }
            );
            taskStore.createIndex("title", "title", { unique: false });
            

            // just for now create some things in the object storelet groupA: DbTaskGroup = new DbTaskGroup();
            
            let groupA: DbTaskGroup = new DbTaskGroup();
            groupA.title = "Group A";
            delete (groupA as any).pk; // ensure pk is undefined so that autoIncrement works
            
            let addRequest: IDBRequest<IDBValidKey> = taskGroupStore.add(groupA);
            addRequest.onsuccess = (addEvent: Event) => {
                console.log("groupA  already has generated pk property:", groupA);
                console.log("Added initial task group, addEvent:", addEvent);
                console.log("Generated pk:", addRequest.result);
                // todo add a task to this group
                let taskA: DbTask = new DbTask();
                taskA.title = "Group A task A";
                taskA.taskGroupId = addRequest.result as number;
                delete (taskA as any).pk; // ensure pk is undefined so that autoIncrement works
                let addTaskRequest: IDBRequest<IDBValidKey> = taskStore.add(taskA); 
                addTaskRequest.onsuccess = (addTaskEvent: Event) => {
                    console.log("Added initial task to group A, addTaskEvent:", addTaskEvent);
                    console.log("Generated pk for task:", addTaskRequest.result);
                }
            }
        }
        request.onsuccess = (event: Event) => {
            console.log('DataStore constructor onsuccess opened IndexedDB');
            this.db = request.result;
        }
        request.onerror = (event: Event) => {
            console.error('DataStore constructor error opening IndexedDB:', request.error);
        }
    }

     private getObjectStore(name: "task-groups" | "tasks", mode: "readonly" | "readwrite"): IDBObjectStore {
        if (!this.idbIDBFactory) {
            throw new Error('IndexedDB is not available in this environment.');
        }
        if (!this.db) {
            // The DB may not have been opened yet; throw so callers can handle it
            // or choose to return an empty value. We prefer throwing so issues are obvious.
            throw new Error('IndexedDB database not opened yet. Wait for constructor to complete (request.onsuccess).');
        }
        const tx = this.db.transaction(name, mode);
        return tx.objectStore(name);
    }

    public async getAllTaskGroups(): Promise<TaskGroup[]> {
        // If IndexedDB isn't available or the DB hasn't opened yet, return an empty array.
        if (!this.idbIDBFactory || !this.db) {
            return [];
        }
        try {
            const store = this.getObjectStore("task-groups", "readonly");
            const req: IDBRequest = store.getAll();
            const results = await new Promise<any[]>((resolve, reject) => {
                req.onsuccess = () => resolve(req.result as any[]);
                req.onerror = () => reject(req.error ?? new Error('Unknown IDB error'));
            });
            return results.map(r => new TaskGroup(r?.pk, EntityStatus.Saved, r?.title));
        } catch (err) {
            console.error('DataStore.getAllTaskGroups failed:', err);
            return [];
        }
    }
}

// I don't want to couple my domain classes to IndexedDB implementation details
// so I create separate classes for the database representation

class DbTaskGroup {
    public pk?: number;   // leave undefined so autoIncrement can generate the key
    public title?: string;
}

class DbTask {
    public pk?: number;   // leave undefined so autoIncrement can generate the key
    public taskGroupId?: number;
    public title?: string;
}

export { DataStore };
