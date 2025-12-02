import { TaskGroup } from "./task-group.class";
import { EntityStatus } from "../ddd/entity-status.enum";
import { ValidityStatus } from "../ddd/validity-status.enum";
import { OperationSummary } from "../ddd/operation-summary.class";

describe('TaskGroup', () => {
    
    // need to create a mock TaskGroupRepository to fully test validateForPersistence
    let tgTheTitle = new TaskGroup(1, EntityStatus.Saved, "the-title");
    let tgAnotherTitle = new TaskGroup(2, EntityStatus.Saved, "another-title");

    const MockRepo = vi.fn(class {
        // need to mock getAll(): Promise<T[]>;
        getAll = vi.fn(async () => {
            return Promise.resolve([tgTheTitle, tgAnotherTitle]);
        });
        save = vi.fn(async (entity: TaskGroup) => {
            return OperationSummary.CreateAsError();
        });
        add = vi.fn(async (entity: TaskGroup) => {
            return OperationSummary.CreateAsError();
        });
        fetchById = vi.fn(async (id: number) => {   
            if(id === tgTheTitle.getId()) {
                return Promise.resolve(tgTheTitle);
            } else if(id === tgAnotherTitle.getId()) {
                return Promise.resolve(tgAnotherTitle);
            } else {
                return Promise.resolve(null);
            }
        });
    });

    it('should create an instance', () => {
        expect(new TaskGroup(1, EntityStatus.Created, "the-title")).toBeTruthy();
    });

    it('should validate as being a duplicate title', () => {
        
        let tgValidationCandidate = new TaskGroup(3, EntityStatus.Created, "another-title");

        var result = TaskGroup.validateForPersistence(tgValidationCandidate, new MockRepo(), false);
        result.then(opSummary => {
            let summary = opSummary.result;
            switch(summary.resultType) {
                case "ValidationSummary":
                    expect(summary.messages.length).toBeGreaterThan(0);
                    let hasDuplicateTitleError = summary.messages.some(msg => 
                        msg.getMember() === 'Title' 
                        && msg.getStatus() === ValidityStatus.Error 
                        && ((msg.getMessage()?.indexOf('Title must be unique (case insensitive).') ?? -1) >= 0)
                    );
                    expect(hasDuplicateTitleError).toBe(true);
                    break;
                case "SystemError":      
                    throw new Error('Expected validation to complete without system error.');
                    break;  
            }
            
        });
    });

    

});