export class FullStackException extends Error {
    public errorCode: number;
    public message: string;   

    constructor(errorCode: number, name: string, message: string) {
        super(message);
        this.errorCode = errorCode;
        this.name = name;
        this.message = message;
    }
}
