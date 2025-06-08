import { TrashService } from "../services";
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { ITrashProvider } from "../models";
import { FullStackException } from "../errors";
import { FileTrashProvider } from "../providers";

export class TrashController {
    private provider: ITrashProvider;
    private service: TrashService;

    constructor() {
        this.provider = new FileTrashProvider();
        this.service = new TrashService(this.provider);
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
}