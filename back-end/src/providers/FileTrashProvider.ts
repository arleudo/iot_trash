import { v4 as uuid } from "uuid";
import * as fs from "fs";
import { ITrash, ITrashInput, ITrashProvider } from "../models";
import { TrashNotExists } from "../errors/TrashNotExists";

const FILE_PATH = "assets/trashs.json";

export class FileTrashProvider implements ITrashProvider {
    private trashs: ITrash[];

    constructor() {
        this.trashs = this.loadFromFile();
    }

    private loadFromFile(): ITrash[] {
        try {
            const data = fs.readFileSync(FILE_PATH, "utf-8");
            return JSON.parse(data) as ITrash[];
        } catch (error) {
            return [];
        }
    }

    private saveToFile(): void {
        fs.writeFileSync(FILE_PATH, JSON.stringify(this.trashs, null, 2), "utf-8");
    }

    async update(trash: Partial<ITrash> & { id: string }): Promise<ITrash> {
        const index = this.trashs.findIndex((u) => u.id === trash.id);
        if (index < 0) {
            throw new TrashNotExists();
        }
        this.trashs[index] = {
            ...this.trashs[index],
            ...trash
        };
    
        this.saveToFile();
        return this.trashs[index];
    }
    

    async delete(id: string): Promise<void> {
        const exist = this.trashs.find((p) => p.id === id);
        if (!exist) {
            throw new TrashNotExists();
        }
        this.trashs = this.trashs.filter((p) => p.id !== id);
        this.saveToFile();
    }

    async create(trash: ITrashInput): Promise<ITrash> {
        const p = { id: uuid(), status: "empty", ...trash } as ITrash;
        this.trashs.push(p);
        this.saveToFile();
        return p;
    }

    async list(): Promise<ITrash[]> {
        return this.trashs;
    }
}
