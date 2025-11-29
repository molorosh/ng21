import { ValidityStatus } from "./validity-status.enum";

class ValidityMessage {
    protected status: ValidityStatus;
    protected member: string | null = null;
    protected message: string | null = null;
    
    constructor(member: string, status: ValidityStatus, message: string | null = null) {
        this.member = member;
        this.status = status;
        this.message = message;
    }

    getMember(): string | null {
        return this.member;
    }

    getStatus(): ValidityStatus {
        return this.status;
    }

    getMessage(): string | null {
        return this.message;
    }
}
export { ValidityMessage };