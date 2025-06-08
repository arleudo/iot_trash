import { FullStackException } from "./FullStackException";
import { StatusCodes } from "http-status-codes";

export class UserLoginError extends FullStackException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, "UserLoginError", "Email ou senha não correspondem, verifique os dados que foram inseridos e tente novamente!");
    }
}