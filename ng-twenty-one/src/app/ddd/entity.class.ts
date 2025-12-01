import { EntityStatus } from "./entity-status.enum";

class Entity {
    protected id: number;
    protected status: EntityStatus;
    
    constructor(id: number, status: EntityStatus) {
        this.id = id;
        this.status = status;
    }

    public getId(): number {
        return this.id;
    }
    public getStatus(): EntityStatus {
        return this.status;
    }
}
export { Entity };