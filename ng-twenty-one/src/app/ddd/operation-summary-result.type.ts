import { ValidityMessage } from "./validity-message.class";
/*
this is a protoype of a more pure version of a 'discriminated union' implementation 
for the Repository Actions like create, delete, update, save 
*/
type OperationSummaryResult = 
{
    // we aren't using this yet but in future it might be useful to have
    // a locale associated with the operation result for localization purposes
    locale: string;
    // an optional parameter that returns whatever identifier was passed into the service by the caller
    identifier: string;
} & (
    {
        resultType: 'SystemError';
        errorCode: number;
        errorMessage: string;
    } | { 
        resultType: 'ValidationSummary'; 
        persisted: boolean; 
        messages: ValidityMessage[]; 
    } 
);
export type { OperationSummaryResult };

/* so we can clever with Typescript and exhaustively check the discriminated union */

// this function is an example of how to use the OperationSummaryResult type
// if you were to add a new type to the union above, the compiler would error here until you handle it
function processOperationResult(opResult: OperationSummaryResult): string {
    let outcome: string;   
    switch(opResult.resultType) {
        case 'SystemError':
            outcome = `Error ${opResult.errorCode}: ${opResult.errorMessage}`;
            break;
        case 'ValidationSummary':
            outcome = `Persisted: ${opResult.persisted}, Messages Count: ${opResult.messages.length}`;
            break;
        default:
            neverReached(opResult);
    }
    return outcome;
}

function neverReached(x: never): never {
    throw new Error("This code should never be reached");
}

