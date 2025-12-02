import { OperationSummaryResult } from "./operation-summary-result.type";

class OperationSummary {
    public result: OperationSummaryResult
    
    constructor(result: OperationSummaryResult) {        
        this.result = result;
    }

    public static CreateAsError(): OperationSummary
    {
        let res: OperationSummaryResult = {
            locale: "",
            identifier: "",
            resultType: "SystemError",
            errorCode: 234,
            errorMessage: "???"
        }
        let os: OperationSummary = {
            result: res
        }
        return os
    }
    
}
export { OperationSummary };
