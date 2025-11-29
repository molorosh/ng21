import { ValidityMessage } from "./validity-message.class";

class ValidationSummary {
    protected success: boolean;
    protected messages: ValidityMessage[] = [];

    constructor(success: boolean, messages: ValidityMessage[] = []) {        
        this.success = success;
        this.messages = messages;
    }

    getSuccess(): boolean {
        return this.success;
    }

    getMessages(): ValidityMessage[] {
        return this.messages;
    }

    addMessage(message: ValidityMessage): void {
        this.messages.push(message);
    }
}
export { ValidationSummary };