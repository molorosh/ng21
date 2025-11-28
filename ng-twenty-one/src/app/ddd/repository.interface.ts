interface Repository<T> {
    add(entity: T): Promise<number>;
    fetchById(id: number): Promise<T | null>; 
    getAll(): Promise<T[]>;
    save(entity: T): Promise<void>;
}
export type { Repository };