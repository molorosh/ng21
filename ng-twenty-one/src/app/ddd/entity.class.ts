import { EntityStatus } from "./entity-status.enum";

class Entity {
    protected id: number;
    protected status: EntityStatus;
    
    constructor(id: number, status: EntityStatus) {
        this.id = id;
        this.status = status;
    }
}
export { Entity };