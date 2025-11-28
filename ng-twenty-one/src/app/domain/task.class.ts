import { Entity } from "../ddd/entity.class";

class Task extends Entity {
    public title: string | null = null;
    public taskGroupId: number | null = null;
    public createdAtUtc: Date | null = null;
    public startedAtUtc: Date | null = null;
    public completedAtUtc: Date | null = null;
    public elapsedMinutes: number | null = null;
    public url: string | null = null;
}
export { Task };