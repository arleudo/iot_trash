import { ITrash, ITrashInput, ITrashProvider } from "../models";

export class TrashService {
    private provider: ITrashProvider;

    constructor(provider: ITrashProvider) {
        this.provider = provider;
    }

    public list = async () => {
        return await this.provider.list()
    }

    public create = async (trash: ITrashInput) => {
        return await this.provider.create(trash);
    }

    public update = async (trash: ITrash) => {
        return await this.provider.update(trash);
    }

    public delete = async (id: string) => {
        return await this.provider.delete(id);
    }
}