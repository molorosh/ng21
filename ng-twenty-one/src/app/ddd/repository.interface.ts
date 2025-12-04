import { OperationSummary } from "./operation-summary.class";

interface Repository<T> {
    add(entity: T): Promise<OperationSummary>;
    fetchById(id: number): Promise<T | null>; 
    getAll(): Promise<T[]>;
    save(entity: T): Promise<OperationSummary>;
    isAwake(): boolean;
}
export type { Repository };