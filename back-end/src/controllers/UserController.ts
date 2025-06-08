import { UserService } from "../services";
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { IUserProvider } from "../models";
import { FullStackException } from "../errors";
import { FileUserProvider } from "../providers";

export class UserController {
    private provider: IUserProvider;
    private service: UserService;

    constructor() {
        this.provider = new FileUserProvider();
        this.service = new UserService(this.provider);
    }

    public list = async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).json(await this.service.list());
    }

    public create = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.CREATED).json(await this.service.create(req.body));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.update(req.body));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.delete(req.params.id));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.login(req.body));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public logout = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.logout(req.params.id));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }
}