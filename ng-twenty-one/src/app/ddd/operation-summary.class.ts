import { SystemError } from "./system-error.class"
import { ValidationSummary } from "./validation-summary.class"

class OperationSummary {
    protected result: SystemError | ValidationSummary
    
    constructor(result: SystemError | ValidationSummary) {        
        this.result = result;
    }
    
    getResult(): SystemError | ValidationSummary {
        return this.result;
    }
}
export { OperationSummary };
