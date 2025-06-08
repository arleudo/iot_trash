import { FullStackException } from "./FullStackException";
import { StatusCodes } from "http-status-codes";

export class UserAlreadyExists extends FullStackException {
    constructor() {
        super(StatusCodes.CONFLICT, "UserAlreadyExists", "Usuário já existe");
    }
}