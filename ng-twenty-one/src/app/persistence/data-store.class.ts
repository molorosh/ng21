class DataStore {
    
    private idbIDBFactory: IDBFactory;
    private name: string;
    private dbVersion: number = 1;

    constructor(idbf: IDBFactory, name: string) {   
        this.idbIDBFactory = idbf;
        this.name = name;
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
            let db: IDBDatabase = request.result;
        }
        request.onerror = (event: Event) => {
            console.error('DataStore constructor error opening IndexedDB:', request.error);
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
