import { EntityStatus } from "./entity-status.enum";
import { Entity } from "./entity.class";

class AggregateRoot extends Entity {
    constructor(id: number, status: EntityStatus) {
        super(id, status);
    }
}
export { AggregateRoot };