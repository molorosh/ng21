import { AggregateRoot } from "../ddd/aggregate-root.class";

class Work extends AggregateRoot {
    public description: string | null = null;
}
export { Work };