import { AggregateRoot } from "../ddd/aggregate-root.class";

class TaskGroup extends AggregateRoot {
    public title: string | null = null;
    public startingFromUtc: Date | null = null;
    public endingBeforeUtc: Date | null = null;
}
export { TaskGroup };