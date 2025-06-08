import { FullStackException } from "./FullStackException";
import { StatusCodes } from "http-status-codes";

export class UserNotExists extends FullStackException {
    constructor() {
        super(StatusCodes.NOT_FOUND, "UserNotExists", "Usuário não existe");
    }
}