import { AggregateRoot } from "../ddd/aggregate-root.class";
import { EntityStatus } from "../ddd/entity-status.enum";
import { OperationSummary } from "../ddd/operation-summary.class";
import { SystemError } from "../ddd/system-error.class";
import { ValidationSummary } from "../ddd/validation-summary.class";
import { ValidityMessage } from "../ddd/validity-message.class";
import { ValidityStatus } from "../ddd/validity-status.enum";
import { TaskGroupRepository } from "./task-group-repository.interface";

class TaskGroup extends AggregateRoot {
    public title: string | null = null;
    public startingFromUtc: Date | null = null;
    public endingBeforeUtc: Date | null = null;

    constructor(id: number, entityStatus: EntityStatus, title: string | null = null, startingFromUtc: Date | null = null, endingBeforeUtc: Date | null = null) {
        super(id, entityStatus);
        this.title = title;
        this.startingFromUtc = startingFromUtc;
        this.endingBeforeUtc = endingBeforeUtc;
    }

    static async validateForPersistence(entity: TaskGroup, repository: TaskGroupRepository, allowWarnings: boolean = false): Promise<OperationSummary> {
        let validationSummary: ValidationSummary = new ValidationSummary(false);
        let existingEntities = await repository.getAll();
        let existingTitles = existingEntities.map(e => e.title?.toLowerCase().trim());
        if (!entity.title || entity.title.trim().length === 0) {
            validationSummary.addMessage(new ValidityMessage('Title', ValidityStatus.Error, 'Title is required.'));
        } else if (existingTitles.includes(entity.title!.toLowerCase().trim())) {
            validationSummary.addMessage(new ValidityMessage('Title', ValidityStatus.Error, 'Title must be unique (case insensitive).'));
        } else if (entity.title!.length > 100) {
            validationSummary.addMessage(new ValidityMessage('Title', ValidityStatus.Error, 'Title is too long (4 to 99 characters).'));
        } else if (entity.title!.length < 4) {
            validationSummary.addMessage(new ValidityMessage('Title', ValidityStatus.Error, 'Title is too short (4 to 99 characters).'));
        }
        if(entity.title!.trim().indexOf(' ') < 0) {
            validationSummary.addMessage(new ValidityMessage('Title', ValidityStatus.Info, 'The title should be multiple words.'));
        }
        return new OperationSummary(validationSummary);
    }
}
export { TaskGroup };