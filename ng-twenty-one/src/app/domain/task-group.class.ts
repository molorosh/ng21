import { AggregateRoot } from "../ddd/aggregate-root.class";
import { EntityStatus } from "../ddd/entity-status.enum";
import { OperationSummaryResult } from "../ddd/operation-summary-result.type";
import { OperationSummary } from "../ddd/operation-summary.class";
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

    /// <summary>
    /// I've put the validation logic here for simplicity, but I might also want to separate it 
    /// into its own service class if it gets more complex.  It feels like there could be a lot of
    /// utility to having a base validation class that other entities can extend from...?
    /// Note that I am following Martin Fowler's advice to have validations be specific to a purpose:
    /// e.g ValidateForPersistence, ValidateForShoppingCart, ValidateForGuestAccess, etc.
    /// It might also be useful if the validation methods also took a locale (e.g. en-US, fr-FR) to
    /// allow for localized validation messages.
    /// </summary>
    static async validateForPersistence(entity: TaskGroup, repository: TaskGroupRepository, allowWarnings: boolean = false): Promise<OperationSummary> {
        let validationMessages: ValidityMessage[] = [];
        let existingEntities = await repository.getAll();
        let existingTitles = existingEntities.map(e => e.title?.toLowerCase().trim());
        if (!entity.title || entity.title.trim().length === 0) {
            validationMessages.push(new ValidityMessage('Title', ValidityStatus.Error, 'Title is required.'));
        } else if (existingTitles.includes(entity.title!.toLowerCase().trim())) {
            validationMessages.push(new ValidityMessage('Title', ValidityStatus.Error, 'Title must be unique (case insensitive).'));
        } else if (entity.title!.length > 100) {
            validationMessages.push(new ValidityMessage('Title', ValidityStatus.Error, 'Title is too long (4 to 99 characters).'));
        } else if (entity.title!.length < 4) {
            validationMessages.push(new ValidityMessage('Title', ValidityStatus.Error, 'Title is too short (4 to 99 characters).'));
        }
        if(entity.title!.trim().indexOf(' ') < 0) {
            validationMessages.push(new ValidityMessage('Title', ValidityStatus.Info, 'The title should be multiple words.'));
        }
        let res: OperationSummaryResult = {
            resultType: "ValidationSummary",
            messages: validationMessages,
            locale: "",
            identifier: "",
            persisted: false
        };
        return new OperationSummary(res);
    }
}
export { TaskGroup };