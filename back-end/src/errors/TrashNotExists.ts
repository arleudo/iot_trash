import { FullStackException } from "./FullStackException";
import { StatusCodes } from "http-status-codes";

export class TrashNotExists extends FullStackException {
    constructor() {
        super(StatusCodes.NOT_FOUND, "TrashNotExists", "Lixeira não existe");
    }
}